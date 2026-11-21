import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SERVER_WASTE_RULES } from './wasteRulesData';
import { SERVER_COLLECTION_POINTS } from './collectionPointsData';

// Initial environment load
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Server middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));

// In-memory feedback and corrections store for runtime persistence
const inMemoryFeedback: any[] = [];
const inMemoryCorrections: any[] = [];

// Gemini model candidate priority
const GEMINI_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
];

/**
 * Structured System Prompt for Multimodal Waste Classification
 */
const WASTE_IDENTIFICATION_PROMPT = `
You are WasteSort AI, a specialist in environmental science, municipal solid waste management, and materials engineering.
Analyze the provided photograph of a waste item.

Return ONLY a strict JSON object with NO markdown formatting, NO backticks, and NO conversational filler.

The JSON MUST conform exactly to this schema:
{
  "item_name": string (e.g. "Plastic water bottle", "AA alkaline battery", "Cardboard delivery box", "Aluminum can", "Banana peel", "Glass jar", "Broken smartphone"),
  "material": string (e.g. "PET plastic #1", "Alkaline zinc-manganese", "Corrugated paperboard", "Aluminum alloy", "Biodegradable organic biomass", "Soda-lime glass"),
  "category": string (MUST be EXACTLY one of: "Paper and cardboard", "Plastic", "Glass", "Metal", "Organic and biodegradable waste", "Electronic waste", "Batteries", "Hazardous waste", "Mixed waste", "General non-recyclable waste"),
  "waste_type": string (MUST be EXACTLY one of: "Dry waste", "Wet waste", "Hazardous waste", "E-waste"),
  "recyclable": boolean,
  "confidence": number (between 0.00 and 1.00 based on visible evidence),
  "condition": string (e.g. "Empty and clean", "Used cell", "Intact", "Greasy", "Spent"),
  "disposal_action": string (e.g. "Dry recyclable waste (Blue Bin)", "Specialized hazardous drop-off", "Wet waste (Green Bin)"),
  "instructions": string[] (array of 3-5 clear, step-by-step preparation and segregation instructions),
  "special_handling": boolean (true if batteries, electronics, chemicals, sharps, or hazardous items),
  "special_handling_warning": string (warning message if special_handling is true, otherwise empty string),
  "collection_type": string (e.g. "Plastic recycling collection point", "Battery recycling drop-off depot", "Municipal wet waste tipper", "Material recovery facility")
}

If the image is ambiguous, blurry, or does not clearly show waste, return:
{
  "item_name": "Uncertain Object",
  "material": "Unknown",
  "category": "Mixed waste",
  "waste_type": "Dry waste",
  "recyclable": false,
  "confidence": 0.40,
  "condition": "Ambiguous / Not clearly identifiable",
  "disposal_action": "Manual inspection required",
  "instructions": ["Take a clearer photograph with better lighting", "Ensure the item is placed on a clean flat surface", "Check for recycle symbol number"],
  "special_handling": false,
  "special_handling_warning": "",
  "collection_type": "General waste"
}
`;

/**
 * POST /api/identify-waste
 */
app.post('/api/identify-waste', async (req: Request, res: Response): Promise<void> => {
  try {
    const { image, locality } = req.body;
    if (!image) {
      res.status(400).json({ error: 'Missing image payload' });
      return;
    }

    // Refresh .env on each request so key changes are immediately active
    dotenv.config();
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();

    // Extract base64 data and mime type
    let mimeType = 'image/jpeg';
    let base64Data = image;

    if (image.startsWith('data:')) {
      const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
    }

    let result: any = null;

    // If Gemini API Key is configured, run live multimodal Gemini AI
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);

      for (const modelName of GEMINI_MODELS) {
        try {
          console.log(`[AI] Calling Google Gemini API with model: ${modelName}...`);
          const model = genAI.getGenerativeModel({ model: modelName });

          const response = await model.generateContent([
            WASTE_IDENTIFICATION_PROMPT,
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
          ]);

          const text = response.response.text().trim();
          const jsonText = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
          result = JSON.parse(jsonText);

          // Ensure instructions is an array
          if (typeof result.instructions === 'string') {
            result.instructions = [result.instructions];
          }
          if (!Array.isArray(result.instructions)) {
            result.instructions = ['Dispose according to local recycling guidelines'];
          }

          result.is_demo = false;
          console.log(`[AI Success] Identified: "${result.item_name}" (${result.category}, confidence: ${result.confidence}) using ${modelName}`);
          break; // Model succeeded!
        } catch (geminiError: any) {
          console.warn(`[AI Warning] Model ${modelName} failed: ${geminiError.message}. Trying next candidate...`);
        }
      }
    }

    // Fallback only if no API key is provided
    if (!result) {
      if (apiKey) {
        // Key was provided but Google API call had an issue
        res.status(502).json({
          error: 'AI vision model could not analyze this image. Please ensure the image is clear and try again.',
        });
        return;
      }

      console.log('[AI] Running in Demonstration Mode (No GEMINI_API_KEY in .env)');
      result = {
        item_name: 'Plastic Water Bottle',
        material: 'PET plastic (Polyethylene Terephthalate)',
        category: 'Plastic',
        waste_type: 'Dry waste',
        recyclable: true,
        confidence: 0.95,
        condition: 'Empty and dry (Demonstration Mode)',
        disposal_action: 'Dry recyclable waste (Blue Bin)',
        instructions: [
          'No GEMINI_API_KEY was found in .env; running in Demonstration Mode.',
          'Empty all liquid contents completely',
          'Rinse briefly to remove sugar or drink residues',
          'Flatten to reduce volume before placing in dry recyclable bin'
        ],
        special_handling: false,
        special_handling_warning: '',
        collection_type: 'Plastic recycling collection point or dry waste bin',
        is_demo: true,
      };
    }

    // Integrate with Local Waste Rules Engine
    const matchedRule = SERVER_WASTE_RULES.find(
      (r) => r.waste_category.toLowerCase() === (result.category || '').toLowerCase()
    );

    if (matchedRule) {
      result.local_rule_applied = {
        locality: matchedRule.locality,
        region: matchedRule.region,
        disposal_method: matchedRule.disposal_method,
        verification_status: matchedRule.verification_status,
        source: matchedRule.source,
      };

      // Add verified local preparation rules
      result.instructions = [
        ...matchedRule.preparation_instructions,
        ...result.instructions.filter(
          (inst: string) =>
            !matchedRule.preparation_instructions.some((p: string) =>
              p.toLowerCase().includes(inst.toLowerCase().slice(0, 15))
            )
        ),
      ];
    }

    res.json(result);
  } catch (error: any) {
    console.error('API Error /api/identify-waste:', error);
    res.status(500).json({ error: error.message || 'Failed to identify waste' });
  }
});

/**
 * GET /api/waste-rules
 */
app.get('/api/waste-rules', (req: Request, res: Response) => {
  const { category } = req.query;
  let rules = [...SERVER_WASTE_RULES];

  if (category && typeof category === 'string') {
    rules = rules.filter((r) => r.waste_category.toLowerCase() === category.toLowerCase());
  }

  res.json(rules);
});

/**
 * GET /api/collection-points
 */
app.get('/api/collection-points', (req: Request, res: Response) => {
  const { category } = req.query;
  let points = [...SERVER_COLLECTION_POINTS];

  if (category && typeof category === 'string' && category !== 'All') {
    points = points.filter((p) =>
      p.accepted_categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
    );
  }

  res.json(points);
});

/**
 * POST /api/feedback
 */
app.post('/api/feedback', (req: Request, res: Response) => {
  const feedback = {
    id: `fb-${Date.now()}`,
    ...req.body,
    created_at: new Date().toISOString(),
  };
  inMemoryFeedback.push(feedback);
  console.log('[Feedback Received]:', feedback);
  res.json({ success: true, message: 'Feedback recorded successfully', id: feedback.id });
});

/**
 * POST /api/correct-classification
 */
app.post('/api/correct-classification', (req: Request, res: Response) => {
  const correction = {
    id: `corr-${Date.now()}`,
    ...req.body,
    created_at: new Date().toISOString(),
  };
  inMemoryCorrections.push(correction);
  console.log('[Classification Correction Logged]:', correction);
  res.json({ success: true, message: 'Correction noted and stored', id: correction.id });
});

// Start listening
app.listen(PORT, () => {
  console.log(`[WasteSort Server] Running on http://localhost:${PORT}`);
});
