export const SERVER_WASTE_RULES = [
  {
    id: 'rule-plastic-gmc-1',
    waste_category: 'Plastic',
    material: 'PET plastic / Rigid plastic containers',
    accepted_condition: 'Empty, rinsed, dry and non-greasy',
    disposal_method: 'Segregated Dry Waste (Blue Bin) Door-to-Door Municipal Collection',
    preparation_instructions: [
      'Empty all liquid contents completely',
      'Quick rinse with water if oily or sugary',
      'Allow to dry to prevent odor and mold',
      'Flatten or crush container to minimize transit volume',
      'Do not mix with wet kitchen vegetable waste'
    ],
    prohibited_actions: [
      'Do not burn plastic (strictly prohibited under Solid Waste Management By-laws)',
      'Do not discard in drains or wetlands (Deepor Beel, Bharalu)',
      'Do not mix with medical needles or food scraps'
    ],
    collection_type: 'Municipal Dry Waste Collection / Material Recovery Facility (MRF)',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'GMC Solid Waste Management By-laws 2020 & SWM Rules 2016 (Demonstration Rule)',
    last_updated: '2024-03-15',
    verification_status: 'demonstration'
  },
  {
    id: 'rule-battery-gmc-1',
    waste_category: 'Batteries',
    material: 'Alkaline, Lead-acid, Lithium-ion cells',
    accepted_condition: 'Intact or spent cell; no active leaks',
    disposal_method: 'Specialized E-Waste / Hazardous Waste Take-back Center',
    preparation_instructions: [
      'Store in a non-conductive, non-metallic dry container',
      'Apply electrical or clear tape over terminal ends (+ and -) to prevent short-circuits',
      'Keep away from heat, water, and flammable materials',
      'Hand over directly to authorized e-waste collector or battery retailer take-back scheme'
    ],
    prohibited_actions: [
      'Strictly PROHIBITED from regular household green/blue waste bins',
      'Never puncture, dismantle, or incinerate batteries',
      'Never discard in open land or storm drains'
    ],
    collection_type: 'Designated E-waste & Battery Drop-off Depot',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'Batteries (Management and Handling) Amendment Rules (Demonstration Rule)',
    last_updated: '2024-02-10',
    verification_status: 'demonstration'
  },
  {
    id: 'rule-paper-gmc-1',
    waste_category: 'Paper and cardboard',
    material: 'Corrugated cartons, newspapers, books, office sheets',
    accepted_condition: 'Dry, non-greasy, free of food oil stains',
    disposal_method: 'Dry Recyclable Waste / Door-to-Door segregated pickup',
    preparation_instructions: [
      'Remove plastic adhesive packing tape and plastic strapping',
      'Flatten cardboard boxes to optimize storage and transport',
      'Bundle newspapers with string or twine',
      'Keep dry; wet soggy paper cannot be recycled'
    ],
    prohibited_actions: [
      'Do not include food-stained pizza boxes or wax-coated cups in paper recycling',
      'Do not burn paper waste'
    ],
    collection_type: 'Paper Recycling Point / GMC Dry Waste Collector',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'Swachh Survekshan Guidelines (Demonstration Rule)',
    last_updated: '2024-01-20',
    verification_status: 'demonstration'
  },
  {
    id: 'rule-organic-gmc-1',
    waste_category: 'Organic and biodegradable waste',
    material: 'Vegetable scraps, cooked food, fruit peels, tea leaves',
    accepted_condition: 'Biodegradable kitchen biomass',
    disposal_method: 'Wet Waste (Green Bin) or Decentralized Home Composter',
    preparation_instructions: [
      'Drain excess gravies or liquids before binning',
      'Ensure no plastic wrappers, rubber bands, or cutlery are mixed in',
      'Deposit in green wet-waste bin for daily morning GMC door-to-door vehicle',
      'Alternatively, convert to organic compost in backyard pit'
    ],
    prohibited_actions: [
      'Do not place inside non-biodegradable single-use plastic bags',
      'Do not mix with dry recyclables, glass, or batteries'
    ],
    collection_type: 'Daily Door-to-Door Wet Waste Tipper (Green Container)',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'GMC Waste Segregation Protocol (Demonstration Rule)',
    last_updated: '2024-02-01',
    verification_status: 'demonstration'
  },
  {
    id: 'rule-glass-gmc-1',
    waste_category: 'Glass',
    material: 'Glass bottles, jars, flint containers',
    accepted_condition: 'Intact or carefully wrapped broken glass',
    disposal_method: 'Dry Recyclable Waste (Separate Glass Stream)',
    preparation_instructions: [
      'Rinse to eliminate sticky liquid residues',
      'Remove metal caps or plastic dispensers',
      'If glass is broken, wrap securely in multiple newspaper sheets to protect municipal sanitation workers'
    ],
    prohibited_actions: [
      'Do not dump loose broken glass into bags with other waste',
      'Do not mix mirror glass, pyrex, or ceramic with container glass'
    ],
    collection_type: 'Material Recovery Facility / Scrap Collector',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'Solid Waste Management Guidelines (Demonstration Rule)',
    last_updated: '2024-01-15',
    verification_status: 'demonstration'
  },
  {
    id: 'rule-ewaste-gmc-1',
    waste_category: 'Electronic waste',
    material: 'Computers, smartphones, chargers, cables, circuit boards',
    accepted_condition: 'Unbroken electronics',
    disposal_method: 'Authorized E-Waste Collection Center (E-Waste Rules 2022)',
    preparation_instructions: [
      'Factory reset devices and erase personal confidential data',
      'Bundle electrical cables neatly',
      'Deliver to certified e-waste drop-off center or schedule specialized e-scrap pickup'
    ],
    prohibited_actions: [
      'Never dismantle CRTs or circuit boards with acid or open flame',
      'Never dispose of electronics in municipal trash bins'
    ],
    collection_type: 'Authorized E-Waste Dismantler / Producer Takeback Point',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'Central Pollution Control Board E-Waste Rules (Demonstration Rule)',
    last_updated: '2024-03-01',
    verification_status: 'demonstration'
  },
  {
    id: 'rule-metal-gmc-1',
    waste_category: 'Metal',
    material: 'Aluminum cans, tin food containers, scrap iron',
    accepted_condition: 'Rinsed clean, non-hazardous',
    disposal_method: 'Dry Recyclable Metal Collection / Scrap Recycler',
    preparation_instructions: [
      'Rinse out food or beverage residues',
      'Compress aluminum beverage cans to save space',
      'Place in dry recyclable stream or sell to local authorized scrap dealer'
    ],
    prohibited_actions: [
      'Do not mix pressurized aerosol cans without completely emptying them',
      'Do not mix sharp industrial razor wires without protective packaging'
    ],
    collection_type: 'Metal Recycling Dealer / GMC MRF',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'GMC Waste Regulations (Demonstration Rule)',
    last_updated: '2024-01-10',
    verification_status: 'demonstration'
  },
  {
    id: 'rule-hazardous-gmc-1',
    waste_category: 'Hazardous waste',
    material: 'Paints, solvents, pesticides, biomedical needles, chemicals',
    accepted_condition: 'Sealed in leak-proof container with clear label',
    disposal_method: 'Special Hazardous Waste Management Facility',
    preparation_instructions: [
      'Keep chemicals in original packaging with intact warning labels',
      'Ensure caps are securely sealed against leaks or volatile vapors',
      'Keep away from children and domestic pets',
      'Contact GMC Special Waste Division for authorized pickup'
    ],
    prohibited_actions: [
      'Never pour chemicals into kitchen sinks, toilets, or street drains',
      'Never combine unknown chemicals together'
    ],
    collection_type: 'Common Hazardous Waste Treatment Storage & Disposal Facility (TSDF)',
    locality: 'Guwahati Municipal Corporation Area',
    region: 'Assam, India',
    source: 'Hazardous and Other Wastes Rules 2016 (Demonstration Rule)',
    last_updated: '2024-02-15',
    verification_status: 'demonstration'
  }
];
