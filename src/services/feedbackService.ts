import { UserFeedback, ClassificationCorrection } from '../types/feedback';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function submitUserFeedback(feedback: UserFeedback): Promise<{ success: boolean; message: string }> {
  // Prefer a verified Supabase insert. The UI only reports a database save when
  // PostgREST confirms the insert without an error.
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('user_feedback').insert({
        feedback_type: feedback.feedback_type,
        related_item: feedback.related_item || null,
        suggested_category: feedback.suggested_category || null,
        description: feedback.description,
        email: feedback.email || null,
      });
      if (!error) return { success: true, message: 'Thank you! Your feedback was saved to the database.' };
      console.warn('Supabase feedback insert error:', error.message);
    } catch (e) {
      console.warn('Supabase feedback insert failed:', e);
    }
  }

  try {
    // Keep the existing Express feedback path as a temporary fallback.
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({}));
      if (result.persisted === true) {
        return { success: true, message: 'Thank you! Your feedback was saved to the database.' };
      }
      saveFeedbackLocally(feedback);
      return { success: true, message: 'Database storage is unavailable; feedback was saved on this device.' };
    }
  } catch (e) {
    console.warn('API feedback endpoint offline, checking Supabase direct insert:', e);
  }

  saveFeedbackLocally(feedback);
  return {
    success: true,
    message: 'Supabase is unavailable; your feedback was saved on this device only.',
  };
}

function saveFeedbackLocally(feedback: UserFeedback) {
  try {
    const key = 'wastesort_pending_feedback';
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([
      ...current,
      { ...feedback, id: feedback.id || `local-${Date.now()}`, created_at: feedback.created_at || new Date().toISOString() },
    ].slice(-100)));
  } catch (error) {
    console.warn('Could not save feedback locally:', error);
  }
}

export async function submitClassificationCorrection(
  correction: ClassificationCorrection
): Promise<{ success: boolean; persisted: boolean; message: string }> {
  try {
    const response = await fetch('/api/correct-classification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(correction),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({}));
      if (result.persisted === true) {
        return { success: true, persisted: true, message: 'Correction saved to the database.' };
      }
    }
  } catch (e) {
    console.warn('API correction endpoint unavailable; saving on this device:', e);
  }

  const locallySaved = saveCorrectionLocally(correction);
  return {
    success: locallySaved,
    persisted: false,
    message: locallySaved
      ? 'Database storage is unavailable; this correction was saved on this device.'
      : 'The correction could not be saved. Please try again.',
  };
}

function saveCorrectionLocally(correction: ClassificationCorrection): boolean {
  try {
    const key = 'wastesort_pending_corrections';
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([
      ...current,
      { ...correction, id: `local-${Date.now()}`, created_at: new Date().toISOString() },
    ].slice(-100)));
    return true;
  } catch (error) {
    console.warn('Could not save correction on this device:', error);
    return false;
  }
}
