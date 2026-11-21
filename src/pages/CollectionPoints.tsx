import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Search,
  Navigation,
  Filter,
  CheckCircle2,
  AlertCircle,
  Compass,
  Phone,
  Clock,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import MapView from '../components/MapView';
import CollectionPointCard from '../components/CollectionPointCard';
import { CollectionPoint, LocationCoordinates } from '../types/collection';
import { WasteCategory } from '../types/waste';
import {
  fetchCollectionPoints,
  getCurrentUserLocation,
  geocodeAddress,
  DEFAULT_COORDINATES,
} from '../services/locationService';

const FILTER_CATEGORIES: (WasteCategory | 'All')[] = [
  'All',
  'Plastic',
  'Paper and cardboard',
  'Glass',
  'Metal',
  'Organic and biodegradable waste',
  'Batteries',
  'Electronic waste',
];

export default function CollectionPoints() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as WasteCategory) || 'All';

  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | 'All'>(
    initialCategory
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [userCoords, setUserCoords] = useState<LocationCoordinates | null>(null);
  const [mapCenter, setMapCenter] = useState<LocationCoordinates>(DEFAULT_COORDINATES);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    loadPoints();
  }, [selectedCategory, userCoords]);

  const loadPoints = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCollectionPoints(
        selectedCategory,
        userCoords || DEFAULT_COORDINATES
      );
      setPoints(data);
      if (data.length > 0 && !selectedPoint) {
        setSelectedPoint(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setSearchError(null);
    try {
      const coords = await getCurrentUserLocation();
      setUserCoords(coords);
      setMapCenter(coords);
    } catch (err: any) {
      setSearchError('Location access was denied or timed out. You can search manually.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchError(null);
    setIsLoading(true);
    try {
      const coords = await geocodeAddress(searchQuery);
      if (coords) {
        setUserCoords(coords);
        setMapCenter(coords);
      } else {
        setSearchError(`Could not find coordinates for "${searchQuery}". Try a nearby area or city.`);
      }
    } catch (err) {
      setSearchError('Failed to geocode address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Responsible Disposal Network
          </span>
          <h1 className="text-3xl font-extrabold text-charcoal">
            Find Waste Collection Points
          </h1>
          <p className="text-sm text-subtext mt-1 max-w-xl">
            Locate certified material recovery facilities, battery collection kiosks, and e-waste takeback hubs.
          </p>
        </div>

        {/* Verification Status Warning / Banner */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 max-w-md">
          <div className="flex items-center gap-1.5 font-bold mb-0.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Demonstration Locations</span>
          </div>
          <p className="text-[11px] leading-tight">
            The locations shown below represent sample centers in Guwahati, Assam for hackathon demonstration. Only facilities marked with a green badge are verified.
          </p>
        </div>
      </div>

      {/* Location Search Bar & Controls */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Manual Location Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area, neighborhood or address (e.g., Beltola, Dispur, Paltan Bazar)..."
              className="w-full pl-10 pr-24 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-charcoal"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              Search
            </button>
          </form>

          {/* Use My Location Action */}
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 font-semibold text-xs flex items-center justify-center gap-2 flex-shrink-0 transition-colors"
          >
            <Compass className={`w-4 h-4 text-brand-600 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Detecting GPS...' : 'Use My Location'}</span>
          </button>
        </div>

        {searchError && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{searchError}</span>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0 mr-1" />
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchParams(cat === 'All' ? {} : { category: cat });
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column View: Left List, Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Collection Points List */}
        <div className="lg:col-span-5 space-y-4 max-h-[750px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-subtext px-1">
            <span>{points.length} Facilities Found</span>
            <span>Sorted by Distance</span>
          </div>

          {points.length > 0 ? (
            points.map((point) => (
              <CollectionPointCard
                key={point.id}
                point={point}
                isSelected={selectedPoint?.id === point.id}
                onSelect={(pt) => {
                  setSelectedPoint(pt);
                  setMapCenter({ latitude: pt.latitude, longitude: pt.longitude });
                }}
              />
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 space-y-2">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto" />
              <h4 className="font-bold text-sm text-charcoal">No collection points match this filter</h4>
              <p className="text-xs text-subtext">
                Try selecting "All" or searching a different neighborhood.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Leaflet Map */}
        <div className="lg:col-span-7 sticky top-24">
          <MapView
            points={points}
            center={mapCenter}
            selectedPoint={selectedPoint}
            onSelectPoint={(pt) => setSelectedPoint(pt)}
            userLocation={userCoords}
          />
        </div>
      </div>
    </div>
  );
}
