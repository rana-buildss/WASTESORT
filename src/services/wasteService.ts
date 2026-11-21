import { WasteCategory, WasteRule } from '../types/waste';
import { LOCAL_RULES_DATASET, findLocalRule } from '../utils/localRules';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function fetchLocalWasteRule(
  category: WasteCategory,
  locality = 'Guwahati Municipal Corporation Area'
): Promise<WasteRule | null> {
  // If Supabase is configured and connected, attempt to fetch from Supabase first
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('waste_rules')
        .select('*')
        .eq('waste_category', category)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return data as WasteRule;
      }
    } catch (e) {
      console.warn('Falling back to local rules engine:', e);
    }
  }

  // Fallback to embedded local rules engine (Guwahati, Assam demonstration dataset)
  return findLocalRule(category, locality);
}

export async function fetchAllWasteRules(): Promise<WasteRule[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('waste_rules').select('*');
      if (!error && data && data.length > 0) {
        return data as WasteRule[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed, using local rules:', e);
    }
  }
  return LOCAL_RULES_DATASET;
}
