import test from 'node:test';
import assert from 'node:assert/strict';
import { predictCrop, validateCropInputs, CROP_DATASET_PROFILES } from './cropModel';
import { recommendFertilizer } from './fertilizerEngine';
import { CropFeatureInput } from '../../src/types/index';

test('Dataset profile contains all 22 standard benchmark crops', () => {
  const cropKeys = Object.keys(CROP_DATASET_PROFILES);
  assert.equal(cropKeys.length, 22);
  assert.ok(cropKeys.includes('rice'));
  assert.ok(cropKeys.includes('maize'));
  assert.ok(cropKeys.includes('chickpea'));
  assert.ok(cropKeys.includes('cotton'));
  assert.ok(cropKeys.includes('coffee'));
  assert.ok(cropKeys.includes('apple'));
});

test('Validates inputs within standard agricultural bounds', () => {
  const validInputs: CropFeatureInput = {
    nitrogen: 80,
    phosphorus: 48,
    potassium: 40,
    temperature: 24,
    humidity: 82,
    ph: 6.4,
    rainfall: 220
  };

  const check = validateCropInputs(validInputs);
  assert.equal(check.isValid, true);
  assert.equal(check.errors.length, 0);
});

test('Rejects invalid input values outside valid ranges', () => {
  const invalid = {
    nitrogen: -10,
    phosphorus: 200,
    potassium: -5,
    temperature: 55,
    humidity: 120,
    ph: 12,
    rainfall: -10
  };

  const check = validateCropInputs(invalid as any);
  assert.equal(check.isValid, false);
  assert.ok(check.errors.length > 0);
});

test('Predicts Rice with high probability under monsoon paddy conditions', () => {
  const riceConditions: CropFeatureInput = {
    nitrogen: 80,
    phosphorus: 48,
    potassium: 40,
    temperature: 24,
    humidity: 82,
    ph: 6.4,
    rainfall: 236
  };
  const result = predictCrop(riceConditions);
  assert.equal(result.recommendedCrop, 'rice');
  assert.ok(result.confidence > 0.5, `Confidence ${result.confidence} should be > 0.5`);
  assert.equal(result.category, 'Cereal');
  assert.ok(result.alternatives.length > 0);
  assert.equal(result.featureAlignments.length, 7);
});

test('Predicts Chickpea under cool, low humidity rabi conditions', () => {
  const chickpeaConditions: CropFeatureInput = {
    nitrogen: 40,
    phosphorus: 68,
    potassium: 80,
    temperature: 18.8,
    humidity: 17,
    ph: 7.3,
    rainfall: 80
  };
  const result = predictCrop(chickpeaConditions);
  assert.equal(result.recommendedCrop, 'chickpea');
  assert.ok(result.confidence > 0.7);
  assert.equal(result.category, 'Pulse');
});

test('Fertilizer engine calculates nutrient deficit and accurate fertilizer dose', () => {
  const soilInput: CropFeatureInput = {
    nitrogen: 40,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 80,
    ph: 6.5,
    rainfall: 200
  };

  const fertResult = recommendFertilizer('rice', soilInput);
  assert.equal(fertResult.crop, 'rice');

  const nStatus = fertResult.nutrientBreakdown.find(n => n.symbol === 'N');
  assert.ok(nStatus);
  assert.equal(nStatus?.status, 'Deficient');
  assert.ok((nStatus?.gap || 0) > 40);

  const ureaItem = fertResult.chemicalFertilizers.find(f => f.fertilizerName.includes('Urea'));
  assert.ok(ureaItem, 'Urea should be prescribed for Nitrogen deficiency');
  assert.ok((ureaItem?.recommendedDoseKgPerHa || 0) > 80);

  assert.equal(fertResult.soilPhAnalysis.phCategory, 'Neutral (Ideal)');
  assert.equal(fertResult.soilPhAnalysis.amendmentNeeded, null);
});

test('Fertilizer engine detects acidic soil and recommends Agricultural Lime', () => {
  const acidSoil: CropFeatureInput = {
    nitrogen: 80,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 80,
    ph: 4.8,
    rainfall: 200
  };

  const fertResult = recommendFertilizer('rice', acidSoil);
  assert.equal(fertResult.soilPhAnalysis.phCategory, 'Strongly Acidic');
  assert.ok(fertResult.soilPhAnalysis.amendmentNeeded?.includes('Lime'));
});

test('Validates zero input for measured nitrogen, phosphorus, potassium, and rainfall', () => {
  const zeroAllowedInputs = {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    temperature: 22,
    humidity: 60,
    ph: 6.5,
    rainfall: 0
  };
  const check = validateCropInputs(zeroAllowedInputs);
  assert.equal(check.isValid, true);
  assert.equal(check.errors.length, 0);
});

test('Plant doctor engine returns clinical diagnosis in English, Hindi, and Urdu', async () => {
  const { diagnosePlantImage } = await import('./plantDoctorEngine');

  const enDiag = await diagnosePlantImage('', 'en', 'rice_blast');
  assert.equal(enDiag.severity, 'Moderate');
  assert.ok(enDiag.condition.includes('Rice Blast'));
  assert.ok(enDiag.symptoms.length > 0);

  const hiDiag = await diagnosePlantImage('', 'hi', 'rice_blast');
  assert.ok(hiDiag.conditionLocalName.includes('झुलसा'));
  assert.ok(hiDiag.symptoms[0].length > 0);

  const urDiag = await diagnosePlantImage('', 'ur', 'rice_blast');
  assert.ok(urDiag.conditionLocalName.includes('بلاسٹ'));
  assert.ok(urDiag.symptoms[0].length > 0);
});

test('Model details accurately reflects GNB statistical profile model and educational benchmark', () => {
  const input: CropFeatureInput = {
    nitrogen: 80,
    phosphorus: 48,
    potassium: 40,
    temperature: 24,
    humidity: 82,
    ph: 6.4,
    rainfall: 236
  };
  const result = predictCrop(input);
  assert.ok(result.modelDetails.algorithm.includes('Gaussian Naive Bayes'));
  assert.ok(result.modelDetails.dataset.includes('Educational Crop Recommendation Benchmark'));
  assert.equal(result.modelDetails.sampleCount, 2200);
  assert.equal(result.modelDetails.classesCount, 22);
});

test('Fertilizer engine explicitly flags output as illustrative estimate with soil testing advisory', () => {
  const soilInput: CropFeatureInput = {
    nitrogen: 30,
    phosphorus: 20,
    potassium: 20,
    temperature: 25,
    humidity: 80,
    ph: 6.5,
    rainfall: 200
  };
  const fertResult = recommendFertilizer('rice', soilInput);
  assert.equal(fertResult.isIllustrativeEstimate, true);
  assert.ok(fertResult.disclaimer.includes('illustrative'));
  assert.ok(fertResult.disclaimer.includes('soil-testing'));
});

test('Farming assistant engine returns grounded advice in English, Hindi, and Urdu', async () => {
  const { handleAssistantChat } = await import('./assistantEngine');

  const enRes = await handleAssistantChat({
    messages: [{ role: 'user', content: 'Explain my crop recommendation' }],
    language: 'en',
    context: {
      cropResult: {
        recommendedCrop: 'rice',
        cropName: 'Rice (Paddy)',
        confidencePercentage: 94.2
      },
      soilInput: {
        nitrogen: 80,
        phosphorus: 48,
        potassium: 40,
        temperature: 24,
        humidity: 82,
        ph: 6.4,
        rainfall: 236
      }
    }
  });
  assert.ok(enRes.reply.includes('Rice'));
  assert.equal(enRes.language, 'en');

  const hiRes = await handleAssistantChat({
    messages: [{ role: 'user', content: 'मिट्टी के पीएच का क्या अर्थ है?' }],
    language: 'hi'
  });
  assert.ok(hiRes.reply.includes('पीएच'));
  assert.equal(hiRes.language, 'hi');

  const urRes = await handleAssistantChat({
    messages: [{ role: 'user', content: 'پودے کے پتے پیلے کیوں ہوتے ہیں؟' }],
    language: 'ur'
  });
  assert.ok(urRes.reply.includes('نائٹروجن') || urRes.reply.includes('پتے'));
  assert.equal(urRes.language, 'ur');
});

