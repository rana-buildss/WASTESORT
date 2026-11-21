import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scan,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Recycle,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Leaf,
  Globe2,
  TreePine,
  Lightbulb,
} from 'lucide-react';
import WasteScanner from '../components/WasteScanner';
import { DEMO_ITEMS } from '../utils/demoData';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/60 via-brand-50/20 to-transparent -z-10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs sm:text-sm font-semibold shadow-subtle">
            <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
            <span>AI-Powered Municipal & Household Waste Segregation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal tracking-tight font-sans max-w-4xl mx-auto leading-tight">
            Don't Guess Where It Goes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-800">
              Let AI Sort It.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-subtext max-w-2xl mx-auto font-normal leading-relaxed">
            Identify everyday waste, discover verified disposal guidelines, and find nearby recycling collection points — all in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/scanner"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Scan className="w-5 h-5" />
              <span>Scan Your Waste</span>
              <ArrowRight className="w-4 h-4 text-brand-200" />
            </Link>

            <Link
              to="/about"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-gray-200 hover:border-brand-500 hover:bg-brand-50/30 text-charcoal font-semibold text-base shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore How It Works</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Scanning Section (Centerpiece of Home Page per spec) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-hover relative">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Instant Scanner
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
              Photograph or Upload Your Waste
            </h2>
            <p className="text-sm text-subtext max-w-lg mx-auto">
              Our vision model classifies polymer type, material composition, and integrates with local disposal by-laws.
            </p>
          </div>

          <WasteScanner compact={true} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Simple 3-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
            How WasteSort Works
          </h2>
          <p className="text-base text-subtext max-w-xl mx-auto">
            From image capture to responsible drop-off in three straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-hover transition-all text-center space-y-4 relative group">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 font-extrabold text-xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-xl font-bold text-charcoal">Scan</h3>
            <p className="text-sm text-subtext leading-relaxed">
              Photograph any packaging, battery, food scrap, or household waste with your mobile camera or upload an existing photo.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-hover transition-all text-center space-y-4 relative group">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 font-extrabold text-xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-xl font-bold text-charcoal">Identify</h3>
            <p className="text-sm text-subtext leading-relaxed">
              Google Gemini multimodal vision analyzes material structure, condition, hazard indicators, and matches local municipal regulations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-hover transition-all text-center space-y-4 relative group">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 font-extrabold text-xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-xl font-bold text-charcoal">Dispose</h3>
            <p className="text-sm text-subtext leading-relaxed">
              Follow step-by-step cleaning and segregation steps and locate verified or nearest community recycling drop-offs on an interactive map.
            </p>
          </div>
        </div>
      </section>

      {/* Waste Categories Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Supported Classifications
            </span>
            <h2 className="text-3xl font-extrabold text-charcoal">
              Segregation Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-sm font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1.5"
          >
            <span>View All Detailed Guidelines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Plastic', desc: 'PET, HDPE, Bottles, Films', color: 'border-sky-200 bg-sky-50 text-sky-800' },
            { name: 'Paper & Cardboard', desc: 'Boxes, Cartons, Print Paper', color: 'border-amber-200 bg-amber-50 text-amber-900' },
            { name: 'Glass', desc: 'Jars, Flint Bottles, Glassware', color: 'border-teal-200 bg-teal-50 text-teal-800' },
            { name: 'Metal', desc: 'Aluminum Cans, Tin, Steel Scraps', color: 'border-slate-200 bg-slate-50 text-slate-800' },
            { name: 'Organic Waste', desc: 'Food Scraps, Peels, Compostables', color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
            { name: 'Electronic Waste', desc: 'Phones, Cables, Circuit Boards', color: 'border-purple-200 bg-purple-50 text-purple-800' },
            { name: 'Batteries', desc: 'Alkaline, Lithium, Button Cells', color: 'border-orange-200 bg-orange-50 text-orange-900' },
            { name: 'Hazardous Waste', desc: 'Paints, Solvents, Sharp Needles', color: 'border-rose-200 bg-rose-50 text-rose-800' },
          ].map((cat) => (
            <div
              key={cat.name}
              className={`p-5 rounded-2xl border ${cat.color} transition-all hover:scale-[1.02] shadow-subtle`}
            >
              <h4 className="font-bold text-base">{cat.name}</h4>
              <p className="text-xs mt-1 opacity-80">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Environmental Impact Section (Truthful, non-fabricated per spec) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-br from-brand-900 to-charcoal rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-800/80 border border-brand-600/60 text-brand-300 text-xs font-semibold">
              <Leaf className="w-3.5 h-3.5" />
              <span>Responsible Environmental Stewardship</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why Source Segregation Matters
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              <p>
                When recyclables are mixed with organic wet waste or unrinsed food residues, entire batches of paper, cardboard, and plastic become contaminated and are diverted to open landfills or incinerators.
              </p>
              <p>
                Crucially, batteries and compact electronics contain heavy metals and volatile electrolytes. Disposing of them in regular household garbage exposes sanitation workers to chemical hazards and creates severe fire risks inside municipal collection trucks.
              </p>
              <p>
                WasteSort eliminates the guesswork at the exact moment of disposal, empowering households to divert clean recyclables and direct hazardous components to specialized facilities.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/scanner"
                className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Scan className="w-4 h-4" />
                <span>Start Sorting Right</span>
              </Link>
              <Link
                to="/collection-points"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-brand-300" />
                <span>Explore Local Depots</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
