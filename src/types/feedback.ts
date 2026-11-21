import { WasteCategory } from './waste';

export type FeedbackType =
  | 'incorrect_classification'
  | 'missing_category'
  | 'incorrect_instructions'
  | 'missing_collection_point';

export interface UserFeedback {
  id?: string;
  feedback_type: FeedbackType;
  related_item?: string;
  suggested_category?: WasteCategory | string;
  description: string;
  email?: string;
  created_at?: string;
}

export interface ClassificationCorrection {
  scan_id?: string;
  original_item: string;
  original_category: WasteCategory;
  corrected_category: WasteCategory;
  explanation?: string;
}
