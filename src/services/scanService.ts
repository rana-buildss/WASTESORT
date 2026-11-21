import { WasteAnalysisResult, WasteScanRecord } from '../types/waste';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const LOCAL_SCAN_HISTORY_KEY = 'wastesort_scan_history';
const HISTORY_LIMIT = 100;

function readLocalHistory(): WasteScanRecord[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_SCAN_HISTORY_KEY) || '[]') as WasteScanRecord[];
  } catch {
    return [];
  }
}

function writeLocalHistory(records: WasteScanRecord[]) {
  try {
    localStorage.setItem(LOCAL_SCAN_HISTORY_KEY, JSON.stringify(records.slice(0, HISTORY_LIMIT)));
  } catch (error) {
    console.warn('Could not cache scan history on this device:', error);
  }
}

function toScanRecord(result: WasteAnalysisResult): Omit<WasteScanRecord, 'id' | 'created_at'> {
  return {
    item_name: result.item_name,
    material: result.material,
    category: result.category,
    waste_type: result.waste_type,
    recyclable: result.recyclable,
    confidence: result.confidence,
    disposal_action: result.disposal_action,
    instructions: result.instructions,
    // Do not store the uploaded image; the existing schema supports image_url but
    // no storage bucket is configured and the image can contain private details.
  };
}

/** Save the successful classification and return only after the DB response is checked. */
export async function saveWasteScan(result: WasteAnalysisResult): Promise<{ savedToDatabase: boolean; record: WasteScanRecord }> {
  const localRecord: WasteScanRecord = {
    ...toScanRecord(result),
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('waste_scans')
        .insert(toScanRecord(result))
        .select('*')
        .single();
      if (!error && data) {
        const saved = data as WasteScanRecord;
        const cache = readLocalHistory().filter((row) => row.id !== saved.id);
        writeLocalHistory([saved, ...cache]);
        return { savedToDatabase: true, record: saved };
      }
      console.warn('Supabase scan insert error:', error?.message || 'No row returned');
    } catch (error) {
      console.warn('Supabase scan insert failed:', error);
    }
  }

  writeLocalHistory([localRecord, ...readLocalHistory()]);
  return { savedToDatabase: false, record: localRecord };
}

/** Loads recent DB history, falling back to device-local history during outages. */
export async function fetchScanHistory(): Promise<WasteScanRecord[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('waste_scans')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(HISTORY_LIMIT);
      if (!error && data) {
        const local = readLocalHistory();
        const ids = new Set(data.map((record) => record.id));
        const merged = [...data as WasteScanRecord[], ...local.filter((record) => !ids.has(record.id))]
          .sort((a, b) => b.created_at.localeCompare(a.created_at))
          .slice(0, HISTORY_LIMIT);
        writeLocalHistory(merged);
        return merged;
      }
      console.warn('Supabase scan history query error:', error?.message);
    } catch (error) {
      console.warn('Supabase scan history query failed:', error);
    }
  }
  return readLocalHistory().sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, HISTORY_LIMIT);
}
