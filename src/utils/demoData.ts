import { WasteAnalysisResult, WasteCategory } from '../types/waste';

export interface DemoItem {
  id: string;
  name: string;
  category: WasteCategory;
  shortDesc: string;
  thumbnail: string;
  result: WasteAnalysisResult;
}

// High-quality SVG sample previews embedded directly so demo works 100% offline without external image broken links
export const DEMO_ITEMS: DemoItem[] = [
  {
    id: 'demo-plastic-bottle',
    name: 'Clean Plastic Water Bottle',
    category: 'Plastic',
    shortDesc: 'PET #1 clear beverage container (Clean & Empty)',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23E0F2FE"/><circle cx="100" cy="100" r="70" fill="%23BAE6FD"/><path d="M90 35 h20 v15 h-20 z M82 50 h36 l8 30 v75 a10 10 0 0 1 -10 10 h-32 a10 10 0 0 1 -10 -10 v-75 z" fill="%230284C7" opacity="0.85"/><rect x="85" y="85" width="30" height="40" rx="3" fill="%2338BDF8"/><text x="100" y="108" font-family="sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">PET 1</text></svg>',
    result: {
      item_name: 'Plastic water bottle',
      material: 'PET plastic (Polyethylene Terephthalate)',
      category: 'Plastic',
      waste_type: 'Dry waste',
      recyclable: true,
      confidence: 0.96,
      condition: 'Used, empty and relatively clean',
      disposal_action: 'Dry recyclable waste (Blue Bin)',
      instructions: [
        'Empty any remaining liquids completely.',
        'Rinse with minimal water if contents were sugary or oily.',
        'Allow the bottle to dry completely to prevent mold.',
        'Crush or flatten the bottle to reduce volume.',
        'Keep the plastic cap screwed on or separate per local sorting guideline.',
        'Place it in the designated dry recyclable waste bin (Blue bin).'
      ],
      special_handling: false,
      collection_type: 'Plastic recycling collection point or dry waste bin',
      is_demo: true,
      local_rule_applied: {
        locality: 'Guwahati Municipal Corporation Area',
        region: 'Assam, India',
        disposal_method: 'Dry Waste Segregation (Swachh Bharat Norms)',
        verification_status: 'demonstration',
        source: 'Guwahati Waste By-laws (Demonstration Dataset)'
      }
    }
  },
  {
    id: 'demo-used-battery',
    name: 'Used Alkaline AA Battery',
    category: 'Batteries',
    shortDesc: 'Chemical energy cell with heavy metals & reactive components',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23FFEDD5"/><circle cx="100" cy="100" r="70" fill="%23FED7AA"/><rect x="75" y="45" width="50" height="110" rx="6" fill="%23334155"/><rect x="90" y="32" width="20" height="13" rx="2" fill="%2394A3B8"/><rect x="75" y="90" width="50" height="50" fill="%23EA580C"/><text x="100" y="122" font-family="sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">+</text><text x="100" y="70" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23F8FAFC" text-anchor="middle">AA 1.5V</text></svg>',
    result: {
      item_name: 'Used AA Alkaline Battery',
      material: 'Alkaline (Zinc-Manganese Dioxide / Potassium Hydroxide)',
      category: 'Batteries',
      waste_type: 'Hazardous waste',
      recyclable: true,
      confidence: 0.98,
      condition: 'Discharged / Used cell',
      disposal_action: 'Specialized hazardous drop-off (NEVER regular trash)',
      instructions: [
        'DO NOT place in regular municipal wet or dry household waste.',
        'Do not puncture, incinerate, crush, or disassemble.',
        'Cover the terminal contact ends (+ and -) with clear insulating tape to prevent thermal runaway or accidental fire in transit.',
        'Store in a non-metallic, dry, and cool container away from flammable items.',
        'Hand over to an authorized battery or e-waste recycling collection kiosk.'
      ],
      special_handling: true,
      special_handling_warning: 'CRITICAL HAZARD: Batteries contain hazardous chemicals and reactive electrolytes. Improper disposal in regular garbage can spark fires in sanitation trucks or leach toxic chemicals into groundwater.',
      collection_type: 'Battery or E-waste specialized collection facility',
      is_demo: true,
      local_rule_applied: {
        locality: 'Guwahati Municipal Corporation Area',
        region: 'Assam, India',
        disposal_method: 'Separate Hazardous / E-waste collection channel',
        verification_status: 'demonstration',
        source: 'Batteries (Management and Handling) Rules & GMC Guidelines (Demonstration Dataset)'
      }
    }
  },
  {
    id: 'demo-cardboard-box',
    name: 'Corrugated Cardboard Box',
    category: 'Paper and cardboard',
    shortDesc: 'Clean packaging box without food stains or grease',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23FEF3C7"/><rect x="55" y="70" width="90" height="80" rx="4" fill="%23D97706"/><polygon points="55,70 85,45 145,45 145,70" fill="%23B45309"/><polygon points="145,70 145,150 165,120 165,55" fill="%2392400E"/><text x="100" y="115" font-family="sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">📦 BOX</text></svg>',
    result: {
      item_name: 'Corrugated Cardboard Shipping Box',
      material: 'Corrugated paperboard / Cellulose fiber',
      category: 'Paper and cardboard',
      waste_type: 'Dry waste',
      recyclable: true,
      confidence: 0.95,
      condition: 'Dry, intact, clean packaging',
      disposal_action: 'Dry paper recyclables collection',
      instructions: [
        'Remove any plastic adhesive tape, bubble wrap, or styrofoam inserts.',
        'Flatten the cardboard box to save collection space.',
        'Ensure the cardboard is dry and free of pizza grease or food contamination.',
        'Bundle or tie with twine if presenting large quantities.',
        'Deposit into the dry recyclable container or hand to municipal paper recycler.'
      ],
      special_handling: false,
      collection_type: 'Paper and packaging recycling center',
      is_demo: true,
      local_rule_applied: {
        locality: 'Guwahati Municipal Corporation Area',
        region: 'Assam, India',
        disposal_method: 'Dry Recyclable Waste (Door-to-door / Kabadiwala)',
        verification_status: 'demonstration',
        source: 'Solid Waste Management Rules 2016'
      }
    }
  },
  {
    id: 'demo-glass-bottle',
    name: 'Glass Beverage Bottle',
    category: 'Glass',
    shortDesc: 'Intact flint/amber glass container',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23CCFBF1"/><circle cx="100" cy="100" r="70" fill="%2399F6E4"/><path d="M92 40 h16 v22 l10 20 v68 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8 v-68 l10 -20 z" fill="%230D9488" opacity="0.85"/><text x="100" y="115" font-family="sans-serif" font-size="11" font-weight="bold" fill="white" text-anchor="middle">GLASS</text></svg>',
    result: {
      item_name: 'Glass Beverage Bottle',
      material: 'Soda-lime glass',
      category: 'Glass',
      waste_type: 'Dry waste',
      recyclable: true,
      confidence: 0.94,
      condition: 'Intact, unbroken glass container',
      disposal_action: 'Dry glass recycling container',
      instructions: [
        'Rinse thoroughly to remove sweet or alcoholic beverage residue.',
        'Remove metal crown caps or plastic neck rings if easily detachable.',
        'Do not break the bottle — intact glass is safer for waste workers and infinitely recyclable.',
        'Wrap safely if chipped to prevent lacerations.',
        'Place in dedicated glass dry waste collection or return to local deposit scheme.'
      ],
      special_handling: false,
      collection_type: 'Glass collection depot or dry waste bin',
      is_demo: true,
      local_rule_applied: {
        locality: 'Guwahati Municipal Corporation Area',
        region: 'Assam, India',
        disposal_method: 'Glass Recovery Segregation',
        verification_status: 'demonstration',
        source: 'Demonstration Local Rule'
      }
    }
  },
  {
    id: 'demo-fruit-peel',
    name: 'Banana & Citrus Peels',
    category: 'Organic and biodegradable waste',
    shortDesc: 'Raw compostable kitchen organic matter',
    thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23DCFCE7"/><circle cx="100" cy="100" r="70" fill="%23BBF7D0"/><path d="M60 130 C70 90, 110 65, 145 75 C125 105, 95 140, 60 130 Z" fill="%23EAB308"/><circle cx="130" cy="125" r="25" fill="%23F97316"/><text x="100" y="165" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23166534" text-anchor="middle">ORGANIC</text></svg>',
    result: {
      item_name: 'Fruit Peels & Kitchen Food Scraps',
      material: 'Biodegradable organic biomass',
      category: 'Organic and biodegradable waste',
      waste_type: 'Wet waste',
      recyclable: true, // Compostable
      confidence: 0.97,
      condition: 'Fresh biodegradable scraps',
      disposal_action: 'Wet waste (Green Bin) or home composting',
      instructions: [
        'Drain excess liquids to avoid rancidity and leachate.',
        'Do not mix with plastic wrappers, toothpicks, or packaging films.',
        'Place into household Green Bin for daily wet waste municipal collection.',
        'Ideal for backyard composting or vermicomposting systems.',
        'Keep container covered to deter pests and odors.'
      ],
      special_handling: false,
      collection_type: 'Daily municipal wet waste collection (Green Bin) / Composter',
      is_demo: true,
      local_rule_applied: {
        locality: 'Guwahati Municipal Corporation Area',
        region: 'Assam, India',
        disposal_method: 'Daily Wet Waste Door-to-Door Collection',
        verification_status: 'demonstration',
        source: 'GMC Solid Waste Management (Demonstration Dataset)'
      }
    }
  }
];
