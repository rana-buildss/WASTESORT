import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { image, locality } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY environment variable is not set.',
          is_demo: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    let mimeType = 'image/jpeg';
    let base64Data = image;

    if (image.startsWith('data:')) {
      const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
    }

    const prompt = `
Analyze this waste item photograph and respond ONLY with a JSON object.
Schema:
{
  "item_name": string,
  "material": string,
  "category": string (One of: "Paper and cardboard", "Plastic", "Glass", "Metal", "Organic and biodegradable waste", "Electronic waste", "Batteries", "Hazardous waste", "Mixed waste", "General non-recyclable waste"),
  "waste_type": string (One of: "Dry waste", "Wet waste", "Hazardous waste", "E-waste"),
  "recyclable": boolean,
  "confidence": number,
  "condition": string,
  "disposal_action": string,
  "instructions": string[],
  "special_handling": boolean,
  "special_handling_warning": string,
  "collection_type": string
}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType,
        },
      },
    ]);

    const text = result.response.text().trim();
    const cleanedJson = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const data = JSON.parse(cleanedJson);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
