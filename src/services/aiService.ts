import { WasteAnalysisResult, WasteCategory } from '../types/waste';
import { DEMO_ITEMS } from '../utils/demoData';
import { fetchLocalWasteRule } from './wasteService';

export interface IdentifyWasteOptions {
  locality?: string;
  isDemo?: boolean;
  demoId?: string;
}

/**
 * Validates the raw JSON result from AI to ensure all required fields are present
 * and correctly typed.
 */
export function validateAiWasteResult(data: any): data is WasteAnalysisResult {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.item_name !== 'string' || !data.item_name.trim()) return false;
  if (typeof data.category !== 'string') return false;
  if (typeof data.recyclable !== 'boolean') return false;
  if (typeof data.confidence !== 'number' || isNaN(data.confidence)) return false;
  if (!Array.isArray(data.instructions) || data.instructions.length === 0) return false;
  return true;
}

/**
 * Communicates with the secure backend endpoint /api/identify-waste
 * Gemini is called by the Express backend so its API key stays server-side.
 */
export async function identifyWasteImage(
  imageDataBase64OrFile: string | File,
  options: IdentifyWasteOptions = {}
): Promise<WasteAnalysisResult> {
  const locality = options.locality || 'Guwahati Municipal Corporation Area';

  // 1. If explicit demo preset item was clicked, return that exact preset item
  if (options.demoId) {
    const demo = DEMO_ITEMS.find((d) => d.id === options.demoId);
    if (demo) {
      const localRule = await fetchLocalWasteRule(demo.result.category, locality);
      return {
        ...demo.result,
        image_preview: demo.thumbnail,
        local_rule_applied: localRule ? {
          locality: localRule.locality,
          region: localRule.region,
          disposal_method: localRule.disposal_method,
          verification_status: localRule.verification_status,
          source: localRule.source,
        } : undefined,
      };
    }
  }

  const base64Image = typeof imageDataBase64OrFile === 'string'
    ? imageDataBase64OrFile
    : await fileToBase64(imageDataBase64OrFile);

  // 2. Attempt backend endpoint call
  try {
    const payload = {
      image: base64Image,
      locality,
    };

    const response = await fetch('/api/identify-waste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      if (validateAiWasteResult(data)) {
        const localRule = await fetchLocalWasteRule(data.category as WasteCategory, locality);
        if (localRule) {
          data.local_rule_applied = {
            locality: localRule.locality,
            region: localRule.region,
            disposal_method: localRule.disposal_method,
            verification_status: localRule.verification_status,
            source: localRule.source,
          };
          data.instructions = [
            ...localRule.preparation_instructions,
            ...data.instructions.filter(
              (inst) => !localRule.preparation_instructions.some((p) => p.toLowerCase().includes(inst.toLowerCase().slice(0, 15)))
            ),
          ];
        }
        return data;
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.error) {
        console.warn('Backend API returned error:', errorData.error);
      }
    }
  } catch (error) {
    console.warn('Backend API request failed or unreachable; using demo fallback:', error);
  }

  // 3. Default demo mode fallback if the secure backend is unavailable
  await new Promise((res) => setTimeout(res, 1000));
  const fallback = DEMO_ITEMS[0];
  const localRule = await fetchLocalWasteRule(fallback.result.category, locality);

  return {
    ...fallback.result,
    is_demo: true,
    image_preview: base64Image,
    local_rule_applied: localRule ? {
      locality: localRule.locality,
      region: localRule.region,
      disposal_method: localRule.disposal_method,
      verification_status: localRule.verification_status,
      source: localRule.source,
    } : undefined,
  };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
