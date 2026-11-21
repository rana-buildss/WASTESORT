import { WasteCategory, WasteType } from '../types/waste';

export function getCategoryColor(category: WasteCategory): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  dot: string;
} {
  switch (category) {
    case 'Plastic':
      return {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        badge: 'bg-sky-100 text-sky-800 border-sky-300',
        dot: 'bg-sky-500',
      };
    case 'Paper and cardboard':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-900 border-amber-300',
        dot: 'bg-amber-500',
      };
    case 'Glass':
      return {
        bg: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        badge: 'bg-teal-100 text-teal-800 border-teal-300',
        dot: 'bg-teal-500',
      };
    case 'Metal':
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        badge: 'bg-slate-100 text-slate-800 border-slate-300',
        dot: 'bg-slate-500',
      };
    case 'Organic and biodegradable waste':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-800',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dot: 'bg-emerald-500',
      };
    case 'Electronic waste':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-800',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-800 border-purple-300',
        dot: 'bg-purple-500',
      };
    case 'Batteries':
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-800',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-900 border-orange-300',
        dot: 'bg-orange-500',
      };
    case 'Hazardous waste':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-800',
        border: 'border-rose-200',
        badge: 'bg-rose-100 text-rose-800 border-rose-300',
        dot: 'bg-rose-500',
      };
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-800',
        border: 'border-gray-200',
        badge: 'bg-gray-100 text-gray-800 border-gray-300',
        dot: 'bg-gray-500',
      };
  }
}

export function getWasteTypeBadge(type: WasteType): {
  label: string;
  className: string;
} {
  switch (type) {
    case 'Wet waste':
      return {
        label: 'Wet Waste (Green Bin)',
        className: 'bg-green-100 text-green-800 border-green-300',
      };
    case 'Dry waste':
      return {
        label: 'Dry Recyclable (Blue Bin)',
        className: 'bg-blue-100 text-blue-800 border-blue-300',
      };
    case 'Hazardous waste':
      return {
        label: 'Hazardous (Red / Designated Bin)',
        className: 'bg-red-100 text-red-800 border-red-300 animate-pulse-subtle',
      };
    case 'E-waste':
      return {
        label: 'E-Waste (E-Drop / Grey Bin)',
        className: 'bg-purple-100 text-purple-800 border-purple-300',
      };
    default:
      return {
        label: type,
        className: 'bg-gray-100 text-gray-800 border-gray-300',
      };
  }
}

export function formatConfidence(score: number): {
  percentage: number;
  label: string;
  badgeClass: string;
} {
  const percentage = Math.round(score * 100);
  if (percentage >= 90) {
    return {
      percentage,
      label: 'High Confidence',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    };
  } else if (percentage >= 70) {
    return {
      percentage,
      label: 'Moderate Confidence',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    };
  } else {
    return {
      percentage,
      label: 'Low / Uncertain',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    };
  }
}
