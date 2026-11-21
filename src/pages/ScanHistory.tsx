import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Recycle, ScanLine } from 'lucide-react';
import { fetchScanHistory } from '../services/scanService';
import { WasteScanRecord } from '../types/waste';

export default function ScanHistory() {
  const [records, setRecords] = useState<WasteScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchScanHistory().then((history) => {
      if (active) setRecords(history);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center"><Clock3 /></div>
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal">Scan History</h1>
          <p className="text-sm text-subtext">Recent waste classifications saved to your history.</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-subtext">This project currently has no sign-in, so Supabase scan history is shared across the project. Images are not stored.</p>
      {loading ? <p className="py-12 text-center text-subtext">Loading scan history…</p> : records.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <ScanLine className="w-10 h-10 mx-auto text-gray-400 mb-3" />
          <h2 className="font-bold text-charcoal">No scans yet</h2>
          <p className="text-sm text-subtext mt-1">Your successful scans will appear here.</p>
          <Link to="/scanner" className="inline-flex mt-5 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold">Scan waste</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {records.map((record) => (
            <article key={record.id} className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
              <div className="flex items-start gap-3">
                <Recycle className="w-5 h-5 mt-1 text-brand-600 flex-shrink-0" />
                <div>
                  <h2 className="font-bold text-charcoal">{record.item_name}</h2>
                  <p className="text-sm text-subtext">{record.category} · {record.material}</p>
                  <p className="text-sm mt-1">{record.disposal_action}</p>
                </div>
              </div>
              <time className="text-xs text-subtext sm:text-right" dateTime={record.created_at}>{new Date(record.created_at).toLocaleString()}</time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
