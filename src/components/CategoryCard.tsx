import React from 'react';
import {
  FileText,
  Layers,
  GlassWater,
  Wrench,
  Apple,
  Cpu,
  BatteryCharging,
  AlertTriangle,
  Trash2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { WasteCategory } from '../types/waste';
import { getCategoryColor } from '../utils/formatters';

export interface CategoryInfo {
  name: WasteCategory;
  binColor: string;
  iconName: string;
  description: string;
  examples: string[];
  recyclable: boolean;
  segregationInstructions: string[];
  precautions: string[];
}

interface CategoryCardProps {
  category: CategoryInfo;
  onExplorePoints?: (cat: WasteCategory) => void;
}

export default function CategoryCard({
  category,
  onExplorePoints,
}: CategoryCardProps) {
  const colorStyle = getCategoryColor(category.name);

  const renderIcon = () => {
    switch (category.name) {
      case 'Plastic':
        return <Layers className="w-6 h-6 text-sky-600" />;
      case 'Paper and cardboard':
        return <FileText className="w-6 h-6 text-amber-600" />;
      case 'Glass':
        return <GlassWater className="w-6 h-6 text-teal-600" />;
      case 'Metal':
        return <Wrench className="w-6 h-6 text-slate-600" />;
      case 'Organic and biodegradable waste':
        return <Apple className="w-6 h-6 text-emerald-600" />;
      case 'Electronic waste':
        return <Cpu className="w-6 h-6 text-purple-600" />;
      case 'Batteries':
        return <BatteryCharging className="w-6 h-6 text-orange-600" />;
      case 'Hazardous waste':
        return <AlertTriangle className="w-6 h-6 text-rose-600" />;
      default:
        return <Trash2 className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-card hover:shadow-hover transition-all p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
            {renderIcon()}
          </div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${colorStyle.badge}`}
          >
            {category.binColor}
          </span>
        </div>

        <h3 className="text-xl font-bold text-charcoal">{category.name}</h3>
        <p className="text-xs text-subtext mt-1 leading-relaxed">
          {category.description}
        </p>

        {/* Common Examples */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal block mb-1.5">
            Common Items:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {category.examples.map((ex) => (
              <span
                key={ex}
                className="text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200/60"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>

        {/* Basic Segregation Instructions */}
        <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal block">
            Segregation Instructions:
          </span>
          {category.segregationInstructions.map((inst, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
              <span>{inst}</span>
            </div>
          ))}
        </div>

        {/* Special Precautions */}
        {category.precautions && category.precautions.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold text-[10px] uppercase tracking-wider text-amber-800 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-700" /> Caution / Prohibitions:
            </span>
            {category.precautions.map((p, i) => (
              <p key={i} className="text-[11px] leading-tight">
                • {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Explore Points Action */}
      {onExplorePoints && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => onExplorePoints(category.name)}
            className="w-full py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span>Find Collection Points for {category.name}</span>
          </button>
        </div>
      )}
    </div>
  );
}
