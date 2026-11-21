import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scan,
  ShieldCheck,
  AlertTriangle,
  Brain,
  Database,
  Building2,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
          Mission & Technology
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight font-sans">
          How WasteSort Works
        </h1>
        <p className="text-base sm:text-lg text-subtext max-w-2xl mx-auto leading-relaxed">
          Bridging artificial intelligence with municipal environmental guidelines to eliminate waste confusion and support circular economies.
        </p>
      </div>

      {/* The Core Problem */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-card space-y-4">
        <h2 className="text-2xl font-bold text-charcoal">The Problem WasteSort Solves</h2>
        <p className="text-sm sm:text-base text-subtext leading-relaxed">
          While millions of households wish to dispose of waste responsibly, inconsistent packaging markings, composite materials, and confusing local municipal rules lead to high rates of contamination.
        </p>
        <p className="text-sm sm:text-base text-subtext leading-relaxed">
          When unrinsed food containers or non-recyclable materials enter dry recycling bins, entire truckloads are rejected and redirected to landfills. Simultaneously, improper battery and e-waste disposal causes catastrophic truck fires and toxic leachate.
        </p>
        <p className="text-sm sm:text-base text-subtext leading-relaxed">
          WasteSort provides an immediate, intelligent guide in your pocket: snap a photograph, know exactly what it is, prepare it properly, and discover where to take it.
        </p>
      </section>

      {/* AI Identification & Rules Engine Pipeline */}
      <section className="space-y-6">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
            The Recommendation Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-charcoal">1. AI Vision Model</h3>
            <p className="text-xs text-subtext leading-relaxed">
              Google Gemini multimodal vision analyzes color, reflection, shape, and labeled text to determine the polymer or material composition.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-charcoal">2. Local Rules Engine</h3>
            <p className="text-xs text-subtext leading-relaxed">
              The AI prediction does NOT make arbitrary local assumptions. It queries the municipal database (GMC By-laws dataset) to enforce verified regulations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-charcoal">3. Collection Dispatch</h3>
            <p className="text-xs text-subtext leading-relaxed">
              Coordinates are matched with certified material recovery facilities, scrap collectors, and specialized battery drop-offs via OpenStreetMap.
            </p>
          </div>
        </div>
      </section>

      {/* AI Limitations & Critical Safety Notice */}
      <section
        id="limitations"
        className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-8 sm:p-10 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
            Current Limitations of AI & Safety Precautions
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
          <p>
            While computer vision models achieve high accuracy on standard packaging, visual analysis has inherent constraints:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Internal Contaminants:</strong> An opaque bottle may appear recyclable from the exterior, but contain toxic chemical residues or flammable liquids. Always inspect contents yourself.
            </li>
            <li>
              <strong>Hazardous & Medical Waste:</strong> Never rely exclusively on automated classifications for unidentified syringes, industrial chemicals, or swollen lithium batteries. When in doubt, consult certified hazardous waste professionals.
            </li>
            <li>
              <strong>Local Rule Priority:</strong> Where municipal directives conflict with generalized advice, local laws always take legal precedence.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/scanner"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-600/30 active:scale-95 transition-all"
        >
          <Scan className="w-5 h-5" />
          <span>Experience the Scanner</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
