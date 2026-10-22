import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { predictCrop, validateCropInputs, CROP_DATASET_PROFILES } from './server/ml/cropModel.js';
import { recommendFertilizer, CROP_AGRONOMIC_TARGETS } from './server/ml/fertilizerEngine.js';
import { diagnosePlantImage, SupportedLanguage } from './server/ml/plantDoctorEngine.js';
import { handleAssistantChat } from './server/ml/assistantEngine.js';
import { CropFeatureInput } from './src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      app: 'CropWise AI — Smart Crop & Fertilizer Recommender',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      models: {
        cropRecommender: 'Gaussian Naive Bayes-style statistical profile model (22 classes, 2200 reference records)',
        fertilizerEngine: 'Stoichiometric nutrient balance & INM engine (illustrative estimates)'
      }
    });
  });

  // Sample presets for quick demo in hackathon
  const PRESETS: Record<string, { title: string; description: string; region: string; values: CropFeatureInput }> = {
    rice_monsoon: {
      title: 'Monsoon Rice (Paddy)',
      description: 'High rainfall, heavy moisture, high nitrogen requirement (Kharif staple)',
      region: 'Indo-Gangetic Basin / Coastal Plains',
      values: {
        nitrogen: 80,
        phosphorus: 48,
        potassium: 40,
        temperature: 24,
        humidity: 82,
        ph: 6.4,
        rainfall: 236
      }
    },
    chickpea_rabi: {
      title: 'Rabi Chickpea (Chana)',
      description: 'Cool weather, dry rabi air, phosphorus-demanding legume',
      region: 'Central & Northern Drylands (MP / Rajasthan)',
      values: {
        nitrogen: 40,
        phosphorus: 68,
        potassium: 80,
        temperature: 18.8,
        humidity: 17,
        ph: 7.3,
        rainfall: 80
      }
    },
    cotton_black_soil: {
      title: 'Kharif Cotton (White Gold)',
      description: 'High nitrogen, warm humid weather, deep black cotton soils',
      region: 'Maharashtra (Vidarbha) / Gujarat',
      values: {
        nitrogen: 118,
        phosphorus: 46,
        potassium: 20,
        temperature: 24,
        humidity: 80,
        ph: 6.8,
        rainfall: 80
      }
    },
    coffee_plantation: {
      title: 'Hill Plantation Coffee',
      description: 'High altitude shade, porous humus forest loams, copious rainfall',
      region: 'Western Ghats (Chikkamagaluru / Coorg / Wayanad)',
      values: {
        nitrogen: 101,
        phosphorus: 29,
        potassium: 30,
        temperature: 25.5,
        humidity: 59,
        ph: 6.8,
        rainfall: 158
      }
    },
    grapes_horticulture: {
      title: 'Vineyard Table Grapes',
      description: 'High potassium requirement, controlled moisture, slightly acidic soil',
      region: 'Nashik Valley / Solapur',
      values: {
        nitrogen: 23,
        phosphorus: 133,
        potassium: 200,
        temperature: 24,
        humidity: 82,
        ph: 6.0,
        rainfall: 70
      }
    },
    maize_commercial: {
      title: 'Commercial Hybrid Maize',
      description: 'Balanced fertility, warm moderate humidity, quick turnover grain',
      region: 'Karnataka / Bihar / Telangana',
      values: {
        nitrogen: 78,
        phosphorus: 48,
        potassium: 20,
        temperature: 22.4,
        humidity: 65,
        ph: 6.3,
        rainfall: 65
      }
    }
  };

  app.get('/api/presets', (_req: Request, res: Response) => {
    res.json(PRESETS);
  });

  // Crop list metadata
  app.get('/api/crops-meta', (_req: Request, res: Response) => {
    const list = Object.entries(CROP_DATASET_PROFILES).map(([key, item]) => ({
      key,
      name: item.name,
      botanicalName: item.botanicalName,
      category: item.category,
      season: item.season,
      durationDays: item.durationDays,
      waterRequirement: item.waterRequirement,
      optimalRanges: {
        nitrogen: [item.features.nitrogen.min, item.features.nitrogen.max],
        phosphorus: [item.features.phosphorus.min, item.features.phosphorus.max],
        potassium: [item.features.potassium.min, item.features.potassium.max],
        ph: [item.features.ph.min, item.features.ph.max]
      }
    }));
    res.json(list);
  });

  // Crop Recommendation endpoint
  app.post('/api/recommend-crop', (req: Request, res: Response) => {
    try {
      const input = req.body as CropFeatureInput;
      const validation = validateCropInputs(input);

      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Invalid input parameters',
          details: validation.errors
        });
      }

      const result = predictCrop(input);
      return res.json(result);
    } catch (err: any) {
      console.error('Error in /api/recommend-crop:', err);
      return res.status(500).json({
        error: 'Prediction calculation failed',
        message: err.message
      });
    }
  });

  // Fertilizer Recommendation endpoint
  app.post('/api/recommend-fertilizer', (req: Request, res: Response) => {
    try {
      const { crop, soilInput } = req.body;

      if (!crop || typeof crop !== 'string') {
        return res.status(400).json({ error: 'Selected crop name is required' });
      }

      const validation = validateCropInputs(soilInput);
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Invalid soil input parameters',
          details: validation.errors
        });
      }

      const result = recommendFertilizer(crop, soilInput);
      return res.json(result);
    } catch (err: any) {
      console.error('Error in /api/recommend-fertilizer:', err);
      return res.status(500).json({
        error: 'Fertilizer calculation failed',
        message: err.message
      });
    }
  });

  // AI Plant Doctor: Leaf Image Diagnosis endpoint
  app.post('/api/diagnose-plant', async (req: Request, res: Response) => {
    try {
      const { image, language = 'en', sampleHint } = req.body;

      if (!image && !sampleHint) {
        return res.status(400).json({ error: 'Image data or sampleHint is required' });
      }

      const validLang: SupportedLanguage = ['en', 'hi', 'ur'].includes(language)
        ? (language as SupportedLanguage)
        : 'en';

      const diagnosis = await diagnosePlantImage(image || '', validLang, sampleHint);
      return res.json(diagnosis);
    } catch (err: any) {
      console.error('Error in /api/diagnose-plant:', err);
      return res.status(500).json({
        error: 'Plant diagnosis failed',
        message: err.message
      });
    }
  });

  // CropWise Farming Assistant Chat endpoint
  app.post('/api/assistant/chat', async (req: Request, res: Response) => {
    try {
      const { messages, language = 'en', context } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const validLang: SupportedLanguage = ['en', 'hi', 'ur'].includes(language)
        ? (language as SupportedLanguage)
        : 'en';

      const response = await handleAssistantChat({
        messages,
        language: validLang,
        context
      });

      return res.json(response);
    } catch (err: any) {
      console.error('Error in /api/assistant/chat:', err);
      return res.status(500).json({
        error: 'Assistant query failed',
        message: err.message
      });
    }
  });

  // Static files or Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 CropWise AI Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start CropWise AI server:', err);
  process.exit(1);
});
