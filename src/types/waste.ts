export type WasteCategory =
  | 'Paper and cardboard'
  | 'Plastic'
  | 'Glass'
  | 'Metal'
  | 'Organic and biodegradable waste'
  | 'Electronic waste'
  | 'Batteries'
  | 'Hazardous waste'
  | 'Mixed waste'
  | 'General non-recyclable waste';

export type WasteType = 'Dry waste' | 'Wet waste' | 'Hazardous waste' | 'E-waste';

export interface WasteAnalysisResult {
  id?: string;
  item_name: string;
  material: string;
  category: WasteCategory;
  waste_type: WasteType;
  recyclable: boolean;
  confidence: number; // 0.0 to 1.0
  condition: string;
  disposal_action: string;
  instructions: string[];
  special_handling: boolean;
  special_handling_warning?: string;
  collection_type: string;
  is_demo?: boolean;
  scan_saved_to_database?: boolean;
  image_preview?: string;
  local_rule_applied?: {
    locality: string;
    region: string;
    disposal_method: string;
    verification_status: string;
    source: string;
  };
}

export interface WasteRule {
  id: string;
  waste_category: WasteCategory;
  material: string;
  accepted_condition: string;
  disposal_method: string;
  preparation_instructions: string[];
  prohibited_actions: string[];
  collection_type: string;
  locality: string;
  region: string;
  source: string;
  last_updated: string;
  verification_status: 'verified' | 'demonstration';
}

export interface WasteScanRecord {
  id: string;
  item_name: string;
  material: string;
  category: WasteCategory;
  waste_type: WasteType;
  recyclable: boolean;
  confidence: number;
  disposal_action: string;
  instructions: string[];
  image_url?: string;
  created_at: string;
}
