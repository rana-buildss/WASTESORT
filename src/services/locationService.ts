import { CollectionPoint, LocationCoordinates } from '../types/collection';
import { WasteCategory } from '../types/waste';
import { DEMO_COLLECTION_POINTS, calculateDistanceKm } from '../utils/collectionPointsData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Default center: Guwahati, Assam, India
export const DEFAULT_COORDINATES: LocationCoordinates = {
  latitude: 26.1445,
  longitude: 91.7362,
  label: 'Guwahati, Assam, India',
};

export async function getCurrentUserLocation(): Promise<LocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          label: 'Current Location',
        });
      },
      (err) => {
        reject(err);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

/**
 * Searches for coordinates using OpenStreetMap Nominatim geocoding service.
 */
export async function geocodeAddress(query: string): Promise<LocationCoordinates | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=1`;
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'WasteSort-App/1.0',
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
          label: data[0].display_name,
        };
      }
    }
  } catch (err) {
    console.warn('Nominatim geocode failed:', err);
  }
  return null;
}

export async function fetchCollectionPoints(
  categoryFilter?: WasteCategory | 'All',
  userCoords?: LocationCoordinates
): Promise<CollectionPoint[]> {
  let points: CollectionPoint[] = [];

  // Try Supabase first if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('collection_points').select('*');
      if (!error && data && data.length > 0) {
        points = data as CollectionPoint[];
      }
    } catch (e) {
      console.warn('Supabase collection points query error:', e);
    }
  }

  // Fallback to demonstration collection points
  if (points.length === 0) {
    points = [...DEMO_COLLECTION_POINTS];
  }

  // Filter by category if specified and not 'All'
  if (categoryFilter && categoryFilter !== 'All') {
    points = points.filter((p) =>
      p.accepted_categories.some(
        (cat) => cat.toLowerCase() === categoryFilter.toLowerCase()
      )
    );
  }

  // Calculate distance if coordinates provided
  const coords = userCoords || DEFAULT_COORDINATES;
  points = points.map((p) => ({
    ...p,
    distance_km: calculateDistanceKm(
      coords.latitude,
      coords.longitude,
      p.latitude,
      p.longitude
    ),
  }));

  // Sort by nearest distance
  points.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));

  return points;
}
