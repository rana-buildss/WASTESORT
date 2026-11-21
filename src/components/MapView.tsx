import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CollectionPoint, LocationCoordinates } from '../types/collection';
import { ExternalLink, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';

// Fix Leaflet's default icon missing issues in webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom SVG Icons for points and user location
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
        <div style="width: 10px; height: 10px; background-color: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const userIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #0284c7; border: 3px solid white; box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.4); animation: pulse 2s infinite;"></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -11],
});

const defaultMarkerIcon = createCustomIcon('#16a34a');
const selectedMarkerIcon = createCustomIcon('#ea580c');

// Map Recenter Helper Component
function RecenterMap({ coords }: { coords: LocationCoordinates }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([coords.latitude, coords.longitude], 13, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

interface MapViewProps {
  points: CollectionPoint[];
  center: LocationCoordinates;
  selectedPoint?: CollectionPoint | null;
  onSelectPoint?: (point: CollectionPoint) => void;
  userLocation?: LocationCoordinates | null;
}

export default function MapView({
  points,
  center,
  selectedPoint,
  onSelectPoint,
  userLocation,
}: MapViewProps) {
  return (
    <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden shadow-card border border-gray-200 relative">
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap
          coords={
            selectedPoint
              ? { latitude: selectedPoint.latitude, longitude: selectedPoint.longitude }
              : center
          }
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
            <Popup>
              <div className="p-1 text-center">
                <span className="font-bold text-xs text-blue-700">Your Detected Location</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Collection Point Markers */}
        {points.map((point) => {
          const isSelected = selectedPoint?.id === point.id;
          const markerIcon = isSelected ? selectedMarkerIcon : defaultMarkerIcon;

          return (
            <Marker
              key={point.id}
              position={[point.latitude, point.longitude]}
              icon={markerIcon}
              eventHandlers={{
                click: () => onSelectPoint && onSelectPoint(point),
              }}
            >
              <Popup>
                <div className="p-2 space-y-2 max-w-[240px]">
                  <div>
                    <h4 className="font-bold text-xs text-charcoal">{point.name}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{point.address}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {point.verification_status === 'verified' ? (
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5" /> Demo Data
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] text-gray-600">
                    <span className="font-semibold">Accepts: </span>
                    {point.accepted_categories.slice(0, 3).join(', ')}
                    {point.accepted_categories.length > 3 && '...'}
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-800"
                  >
                    <Navigation className="w-3 h-3" /> Get Directions
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md border border-gray-200 text-[11px] space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-600" />
          <span className="text-gray-700 font-medium">Waste Collection Point</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-600" />
          <span className="text-gray-700 font-medium">Selected Center</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-gray-700 font-medium">Your Location</span>
          </div>
        )}
      </div>
    </div>
  );
}
