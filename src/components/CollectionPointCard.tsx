import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { CollectionPoint } from '../types/collection';
import { getCategoryColor } from '../utils/formatters';

interface CollectionPointCardProps {
  point: CollectionPoint;
  onSelect?: (point: CollectionPoint) => void;
  isSelected?: boolean;
}

export default function CollectionPointCard({
  point,
  onSelect,
  isSelected,
}: CollectionPointCardProps) {
  // Generate external direction link using Google Maps or OpenStreetMap
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`;

  return (
    <div
      onClick={() => onSelect && onSelect(point)}
      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? 'border-brand-600 bg-brand-50/40 ring-2 ring-brand-500/20 shadow-hover'
          : 'border-gray-200 bg-white hover:border-brand-300 hover:shadow-card'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-bold text-charcoal">{point.name}</h4>
            {point.verification_status === 'verified' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3 h-3" /> Verified Center
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                <AlertCircle className="w-3 h-3" /> Demo Location
              </span>
            )}
          </div>
          <p className="text-xs text-subtext mt-1 flex items-start gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
            <span>{point.address}</span>
          </p>
        </div>

        {point.distance_km !== undefined && (
          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold text-brand-700 bg-brand-100/80 px-2.5 py-1 rounded-lg">
              {point.distance_km} km away
            </span>
          </div>
        )}
      </div>

      {/* Operating Hours and Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="truncate">{point.operating_hours}</span>
        </div>
        {point.contact_number && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <a
              href={`tel:${point.contact_number}`}
              onClick={(e) => e.stopPropagation()}
              className="text-brand-700 hover:underline truncate"
            >
              {point.contact_number}
            </a>
          </div>
        )}
      </div>

      {/* Accepted Categories */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-subtext">
          Accepted Waste Materials:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {point.accepted_categories.map((cat) => {
            const style = getCategoryColor(cat);
            return (
              <span
                key={cat}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${style.badge}`}
              >
                {cat}
              </span>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] text-gray-400 italic">
          Source: {point.source}
        </span>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Navigation className="w-3 h-3" />
          <span>Get Directions</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
