import { WasteCategory } from './waste';

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  accepted_categories: WasteCategory[];
  contact_number?: string;
  operating_hours: string;
  verification_status: 'verified' | 'demonstration';
  source: string;
  distance_km?: number;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  label?: string;
}
