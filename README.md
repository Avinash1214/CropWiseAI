# CropWise AI — Smart Crop & Fertilizer Recommender

> **Precision Agriculture AI/ML Engineering Project**  
> An explainable, precision agriculture web application combining genuine Gaussian Naive Bayes classification with ICAR-standard stoichiometric fertilizer recommendations and soil remediation.

---

## 🚀 Quick Start Guide (Run on Your Machine)

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)

### Step 1: Clone or Set Up Project
```bash
git clone <your-repo-url>
cd cropwise-ai
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```

The application will start on **http://localhost:3000**. Open this URL in any browser.

### Step 4: Run Machine Learning & Agronomic Unit Tests
```bash
npx tsx --test server/ml/model.test.ts
```
All 6 tests verify the 22-class Gaussian Naive Bayes model and fertilizer dosage calculations without mock fallbacks.

---

## 📁 Project Architecture & File Tree

```
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Dependencies and scripts (React 19, Express, Vite, Tailwind CSS)
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── server.ts                    # Full-stack Express backend with API routes & Vite middleware
├── server/
│   └── ml/
│       ├── cropModel.ts         # Gaussian Naive Bayes classifier (22 benchmark crops)
│       ├── fertilizerEngine.ts  # Stoichiometric nutrient gap & pH remediation engine
│       └── model.test.ts        # Unit tests verifying ML and fertilizer calculations
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root component coordinating state, views, and navigation
│   ├── index.css                # Global Tailwind CSS imports
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces & types
│   ├── utils/
│   │   └── i18n.ts              # Trilingual dictionary (English, Hindi, Punjabi)
│   └── components/
│       ├── CropWiseLogo.tsx     # Biometric AI leaf vector logo
│       ├── Navbar.tsx           # Responsive header with preset dropdown & language switcher
│       ├── Sidebar.tsx          # Sidebar navigation with active state indicators
│       ├── LandingHero.tsx      # Project presentation showcase & pipeline diagram
│       ├── CropRecommender.tsx  # Input form with sliders, validation, and demo presets
│       ├── CropResultView.tsx   # Top recommended crop card with confidence meter & alternatives
│       ├── FertilizerRecommender.tsx # Precision INM fertilizer advice & timeline
│       ├── SoilRadarChart.tsx   # Custom SVG 7-axis radar chart & N-P-K deficit bar charts
│       ├── PrintableReport.tsx  # Printable / PDF laboratory diagnostic report
│       └── AboutProject.tsx     # ML mathematics, formula documentation, and team attribution
└── README.md
```

---

## 🧠 Machine Learning Model Details

- **Algorithm**: Gaussian Naive Bayes (GNB) with Softmax posterior normalization.
- **Dataset**: Kaggle / ICAR Crop Recommendation benchmark (2,200 instances, 100 samples per crop).
- **Classes**: 22 crops (Rice, Maize, Chickpea, Kidney Beans, Pigeonpeas, Moth Beans, Mung Bean, Black Gram, Lentil, Pomegranate, Banana, Mango, Grapes, Watermelon, Muskmelon, Apple, Orange, Papaya, Coconut, Cotton, Jute, Coffee).
- **Features**: Nitrogen (N), Phosphorus (P), Potassium (K), Soil pH, Temperature (°C), Humidity (%), Rainfall (mm).

---

## 🧪 Fertilizer Stoichiometric Formulas

- $\text{Urea (kg/ha)} = \frac{\text{Target } N - \text{Soil } N}{0.46}$
- $\text{Single Super Phosphate (kg/ha)} = \frac{\text{Target } P - \text{Soil } P}{0.16}$
- $\text{Muriate of Potash (kg/ha)} = \frac{\text{Target } K - \text{Soil } K}{0.60}$
- $\text{Dose per Acre} = \frac{\text{Dose per Hectare}}{2.471}$
