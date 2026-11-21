import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard, { CategoryInfo } from '../components/CategoryCard';
import { WasteCategory } from '../types/waste';
import { Sparkles, BookOpen } from 'lucide-react';

const CATEGORIES_DATA: CategoryInfo[] = [
  {
    name: 'Plastic',
    binColor: 'Blue Bin (Dry Recyclables)',
    iconName: 'Layers',
    description: 'Petroleum-based synthetic polymers commonly used in packaging, containers, and household items.',
    examples: ['PET beverage bottles (#1)', 'HDPE milk jugs (#2)', 'PP food containers (#5)', 'Shampoo bottles'],
    recyclable: true,
    segregationInstructions: [
      'Empty liquids completely and rinse thoroughly.',
      'Allow container to dry completely before binning.',
      'Flatten bottles to save storage and transportation space.',
      'Deposit in the dry waste blue container.'
    ],
    precautions: [
      'Contaminated plastics with oily gravies cannot be mechanically recycled.',
      'Avoid single-use plastic films and multilayer chip bags in regular plastic stream.'
    ]
  },
  {
    name: 'Paper and cardboard',
    binColor: 'Blue Bin / Paper Collection',
    iconName: 'FileText',
    description: 'Cellulose fiber products including corrugated cartons, newsprint, and office stationery.',
    examples: ['Shipping cardboard boxes', 'Newspapers & flyers', 'Office paper', 'Clean paper bags'],
    recyclable: true,
    segregationInstructions: [
      'Remove packing tapes, staples, and bubble wrap inserts.',
      'Flatten cartons and bundle paper sheets with twine.',
      'Keep completely dry — moisture decomposes fiber and causes mold.'
    ],
    precautions: [
      'Greasy pizza boxes or food-contaminated wax wrappers belong in residual waste, NOT paper recycling.',
      'Never incinerate paper waste.'
    ]
  },
  {
    name: 'Batteries',
    binColor: 'Designated Battery Drop-off / Red Bin',
    iconName: 'BatteryCharging',
    description: 'Electrochemical cells containing reactive metals, heavy metals, and toxic chemical electrolytes.',
    examples: ['Alkaline AA / AAA cells', 'Lithium-ion phone/laptop batteries', 'Button watch cells', 'Lead-acid inverter batteries'],
    recyclable: true,
    segregationInstructions: [
      'Keep intact in a dry, non-conductive plastic box.',
      'Insulate positive (+) and negative (-) terminals with clear cellophane tape to prevent contact short-circuits.',
      'Deliver directly to specialized battery recycling points or consumer electronics takeback programs.'
    ],
    precautions: [
      'CRITICAL: Never put batteries in household wet or dry garbage bins. High risk of chemical fires in garbage trucks.',
      'Never attempt to crush, puncture, or burn batteries.'
    ]
  },
  {
    name: 'Electronic waste',
    binColor: 'E-Waste Takeback / Grey Stream',
    iconName: 'Cpu',
    description: 'Discarded electrical and electronic apparatus with circuitry, rare earths, and flame retardants.',
    examples: ['Old smartphones', 'Broken laptops & tablets', 'Charging cables & adapters', 'Computer circuit boards'],
    recyclable: true,
    segregationInstructions: [
      'Back up and securely wipe all confidential personal data.',
      'Do not crack screens or break casing.',
      'Bundle accompanying power cords neatly.',
      'Hand over to authorized PRO (Producer Responsibility Organisation) or registered dismantler.'
    ],
    precautions: [
      'Never smash cathode tubes or burn circuit boards for copper scrap in open air.'
    ]
  },
  {
    name: 'Organic and biodegradable waste',
    binColor: 'Green Bin (Wet Waste)',
    iconName: 'Apple',
    description: 'Decomposable biological kitchen and garden biomass ideal for microbial composting.',
    examples: ['Vegetable & fruit peels', 'Leftover food & cooked rice', 'Tea leaves & coffee grounds', 'Garden leaves & plant clippings'],
    recyclable: true,
    segregationInstructions: [
      'Drain off excess gravies, cooking oils, and soupy liquids.',
      'Do not enclose in non-biodegradable plastic polythene carry bags.',
      'Transfer directly to municipal Green Bin or home vermicompost bin daily.'
    ],
    precautions: [
      'Never mix batteries, medicines, or plastic packaging in wet waste.'
    ]
  },
  {
    name: 'Glass',
    binColor: 'Blue Bin / Glass Depot',
    iconName: 'GlassWater',
    description: 'Inorganic amorphous solid materials that are 100% and infinitely recyclable without loss in quality.',
    examples: ['Flint / Clear glass jars', 'Amber beer & medicine bottles', 'Green beverage bottles'],
    recyclable: true,
    segregationInstructions: [
      'Rinse to clear sticky or sweet residues.',
      'Remove metal screw caps or cork stoppers.',
      'Keep intact — unbroken glass simplifies sorting and prevents sanitation worker injuries.'
    ],
    precautions: [
      'Ceramic mugs, Pyrex bakeware, and mirror glass melt at different temperatures and MUST NOT mix with container glass.',
      'If broken, wrap carefully in thick layers of newspaper and label clearly.'
    ]
  },
  {
    name: 'Metal',
    binColor: 'Blue Bin / Metal Scrap Dealer',
    iconName: 'Wrench',
    description: 'Ferrous and non-ferrous metals that can be re-melted repeatedly with significant energy savings.',
    examples: ['Aluminum beverage cans', 'Tin food cans', 'Metal bottle caps', 'Clean scrap cookware'],
    recyclable: true,
    segregationInstructions: [
      'Rinse food or beverage residues.',
      'Crush aluminum beverage cans to save space.',
      'Place in dry recyclables or sell to community scrap dealer (Kabadiwala).'
    ],
    precautions: [
      'Aerosol cans must be 100% empty before recycling to eliminate explosion hazards.'
    ]
  },
  {
    name: 'Hazardous waste',
    binColor: 'Red Hazardous Bin / TSDF Facility',
    iconName: 'AlertTriangle',
    description: 'Materials presenting substantial danger to public health, sanitation workers, or ecological systems.',
    examples: ['Paints, varnishes & thinners', 'Pesticide containers', 'Expired prescription drugs', 'Medical needles & syringes'],
    recyclable: false,
    segregationInstructions: [
      'Maintain in original labeled containers whenever possible.',
      'Ensure caps and lids are tightly sealed to prevent vapor escape.',
      'Deposit at dedicated municipal hazardous waste collection drives.'
    ],
    precautions: [
      'Never pour down household sinks, storm drains, or toilets.',
      'Keep completely isolated from household garbage and out of reach of children.'
    ]
  }
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200">
          <BookOpen className="w-3.5 h-3.5 text-brand-600" />
          <span>Educational Segregation Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal">
          Waste Categories & Disposal Rules
        </h1>
        <p className="text-base text-subtext">
          Master the fundamentals of waste separation. Clear standards for municipal door-to-door collection, bin colors, and safety measures.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <CategoryCard
            key={cat.name}
            category={cat}
            onExplorePoints={(name) =>
              navigate(`/collection-points?category=${encodeURIComponent(name)}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
