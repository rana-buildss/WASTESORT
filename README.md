# ♻️ WasteSort — AI-Powered Smart Waste Identification & Disposal Guide

> **Tagline:** Scan Smart. Sort Right. Save the Planet.  
> **Industry:** Environment & Climate Technology  
> **Hackathon Prototype:** Mobile-first, fully functional waste identification, local rules integration, and nearby collection center locator.

---

## 🌟 Executive Summary

Improper waste segregation is a leading cause of recycling contamination and hazardous landfill fires. Everyday consumers frequently struggle to determine whether packaging is recyclable, how it must be prepared (e.g. rinsed, crushed), and where hazardous items like batteries or e-waste must be taken.

**WasteSort** solves this through a unified, 3-step platform:
1. **AI Vision Identification:** Analyzes photographs using Google Gemini multimodal intelligence to detect object types, resin codes, condition, and recyclability status.
2. **Local Municipal Rules Engine:** Cross-references identification with municipal waste by-laws (demonstration dataset: Guwahati Municipal Corporation, Assam, India) to provide verified preparation steps.
3. **Interactive Collection Points Map:** Connects users directly to nearby material recovery facilities (MRFs), specialized battery drop-offs, and scrap collection hubs using OpenStreetMap and Leaflet.

---

## 🚀 Key Features

- **Multimodal Waste Scanner:** Supports mobile camera capture (`capture="environment"`) and drag-and-drop file upload (JPG, JPEG, PNG, WEBP up to 10 MB) with automated client-side compression.
- **Dual Live & Offline Demonstration Mode:** Instant testing presets for judges and users without requiring an API key (Clean Plastic Bottle, Used Alkaline Battery, Cardboard Box, Glass Bottle, Food Scraps). Automatically activates live Gemini AI when `GEMINI_API_KEY` is provided.
- **Detailed Disposal Results Dashboard:** Visual breakdown showing material composition, AI confidence indicator, wet/dry classification, step-by-step numbered preparation cards, and hazardous warnings.
- **Interactive OpenStreetMap with Leaflet:** Live geolocation ("Use My Location") + Nominatim search, category filters, distance calculations, and one-click "Get Directions" via Google Maps / OSM.
- **Community Feedback & Correction Engine:** Enables citizens to report incorrect classifications, suggest missing drop-off locations, and submit feedback without requiring login.
- **Comprehensive Educational Directory:** Deep dive into 8+ primary waste categories, color codes (Blue dry bin, Green wet bin, Red hazardous), and prohibitions.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, React Router 6, TanStack Query |
| **Mapping** | Leaflet.js, React-Leaflet, OpenStreetMap, Nominatim Geocoding API |
| **Backend API** | Node.js Express, Multer, TSX runtime (and Supabase Edge Functions) |
| **Database** | Supabase PostgreSQL, Row Level Security (RLS), JSONB indexing |
| **AI Integration** | Google Gemini Multimodal Vision API (`@google/generative-ai`) |

---

## 📂 Project Structure

```
WASTESORT/
├── index.html                   # HTML entry point with Leaflet & font dependencies
├── package.json                 # Project dependencies and run scripts
├── vite.config.ts               # Vite configuration with /api backend proxy
├── tailwind.config.js           # Custom environmental color palette
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Client routing and TanStack Query provider
│   ├── index.css                # Global styles and Leaflet overrides
│   ├── types/
│   │   ├── waste.ts             # Waste categories and result schemas
│   │   ├── collection.ts        # Map collection point interfaces
│   │   └── feedback.ts          # Feedback and correction types
│   ├── utils/
│   │   ├── imageValidation.ts   # File size & format checks + canvas compression
│   │   ├── formatters.ts        # Badges and color themes
│   │   ├── demoData.ts          # Pre-configured demo items for offline hackathon testing
│   │   ├── localRules.ts        # Guwahati Municipal Corporation rules engine
│   │   └── collectionPointsData.ts # Demo drop-off centers dataset
│   ├── services/
│   │   ├── aiService.ts         # Secure backend AI caller with demo fallback
│   │   ├── wasteService.ts      # Local & database rules fetcher
│   │   ├── locationService.ts   # GPS geolocation and Nominatim geocoding
│   │   └── feedbackService.ts   # Feedback and classification corrections
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky nav with mobile drawer & quick scan
│   │   ├── Footer.tsx           # Transparency badges, quick links, feedback
│   │   ├── WasteScanner.tsx     # Reusable photo scanning component
│   │   ├── UploadArea.tsx       # Drag & drop, camera capture, demo presets
│   │   ├── LoadingState.tsx     # Rotating progress messages (no fake percentages)
│   │   ├── ClassificationCard.tsx # Result header, recyclability, confidence
│   │   ├── DisposalInstructions.tsx # Numbered preparation steps with local rules
│   │   ├── CollectionPointCard.tsx # Location card with accepted materials & directions
│   │   ├── MapView.tsx          # Interactive Leaflet map with custom pins
│   │   ├── CategoryCard.tsx     # Educational category cards
│   │   ├── CorrectionModal.tsx  # "Incorrect identification? Correct it" modal
│   │   └── FeedbackModal.tsx    # Citizen feedback form
│   └── pages/
│       ├── Home.tsx             # Landing page with prominent scanner centerpiece
│       ├── Scanner.tsx          # Dedicated mobile scanner page
│       ├── Results.tsx          # Comprehensive disposal recommendation dashboard
│       ├── CollectionPoints.tsx # Leaflet map and collection center search
│       ├── Categories.tsx       # Educational directory of all waste streams
│       └── About.tsx            # Mission, architecture, AI limitations & safety
├── server/
│   ├── index.ts                 # Secure backend server with Gemini integration
│   ├── wasteRulesData.ts        # Server-side municipal rules
│   └── collectionPointsData.ts  # Server-side collection centers
└── supabase/
    ├── migrations/              # PostgreSQL schema with RLS and seed data
    └── functions/               # Supabase Edge Functions (Deno)
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- Node.js v18+ (tested on Node v24)
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
To enable live Google Gemini multimodal identification:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
```
*(If no API key is provided, the application runs seamlessly in **Demonstration Mode** with interactive sample testing).*

### 4. Running the Application

In terminal 1, start the backend server:
```bash
npm run server
```

In terminal 2, start the Vite development server:
```bash
npm run dev
```

Open your browser at: **`http://localhost:5173`**

---

## 🧪 Live Demonstration Guide (For Hackathon Judges)

### Scenario 1: Clean Plastic Bottle
1. On the Homepage or Scanner page, click the **"Clean Plastic Water Bottle"** preset (or upload a photo of a clear PET bottle).
2. Click **"Identify Waste with AI"**.
3. View the rotating progress states: *"Analyzing your image...", "Identifying material...", "Checking disposal guidelines..."*.
4. Inspect the Result Dashboard:
   - Category: **Plastic**
   - Recyclability: **Suitable for Recycling**
   - Bin: **Dry Recyclable (Blue Bin)**
   - Verified preparation instructions: Empty liquid, rinse if sugary, allow to dry, crush to reduce volume.
5. Click **"Find Collection Points"** to view nearby plastic recovery facilities on the interactive map.

### Scenario 2: Used Battery (Critical Hazard Warning)
1. Select the **"Used Alkaline AA Battery"** preset or photograph a household battery.
2. Click **"Identify Waste with AI"**.
3. Observe the prominent red banner:
   - **CRITICAL HAZARD WARNING:** Highlighted prohibition against throwing batteries in household trash due to fire risks in sanitation trucks.
   - Special preparation: Tape terminal ends (+ and -) with insulating tape.
4. Click **"Find Collection Points"** to instantly filter and see designated E-Waste & Battery Recycling Depots on the map with phone numbers and operating hours.

---

## 🔒 Security & Data Privacy

- **Server-Side API Key Management:** The Gemini API key and secret credentials reside exclusively on the server side (`server/index.ts` or Supabase Edge Functions); they are never exposed in client bundles.
- **Client-Side Compression:** Images are compressed and sanitized to max 1200px before transit, minimizing cellular bandwidth.
- **Privacy Safeguards:** No user login is required to access disposal guidelines or submit feedback. GPS location is strictly requested with explicit browser permission and includes a manual search alternative.
- **Row Level Security (RLS):** Supabase migrations enforce anonymous insert limits and read-only access to municipal rules.

---

## 📜 License
Developed under the MIT License for Environmental Protection and Smart Cities Initiatives.
