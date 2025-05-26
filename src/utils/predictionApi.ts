import { 
  DiabetesPredictionFormData,
  PredictionResult,
  RiskLevel,
  RiskRecommendations,
  glucoseLevelInterpretation
} from "../types/formTypes";

// Feature importance weights for different scenarios
const featureImportance = {
  fasting: {
    "Polyuria": 0.20,       // Highest importance
    "Polydipsia": 0.18,     // Very high importance
    "Age": 0.12,
    "Gender": 0.04,
    "sudden weight loss": 0.15,
    "partial paresis": 0.08,
    "Irritability": 0.10,
    "Alopecia": 0.05,
    "delayed healing": 0.09,
    "Itching": 0.06,
    "visual blurring": 0.11,
    "muscle stiffness": 0.04,
    "Polyphagia": 0.13,
    "weakness": 0.14,
    "Obesity": 0.06,
    // Added for clinical relevance
    "FamilyDiabetesHistory": 0.15
  },
  postprandial: {
    "Polyuria": 0.22,       // Even more important after eating
    "Polydipsia": 0.20,     // Very important after eating
    "Age": 0.10,
    "Gender": 0.03,
    "sudden weight loss": 0.12,
    "partial paresis": 0.09,
    "Irritability": 0.08,
    "Alopecia": 0.04,
    "delayed healing": 0.10,
    "Itching": 0.05,
    "visual blurring": 0.13, // More significant post-meal
    "muscle stiffness": 0.05,
    "Polyphagia": 0.15,     // Increased importance
    "weakness": 0.12,
    "Obesity": 0.07,
    // Added for clinical relevance
    "FamilyDiabetesHistory": 0.12
  }
};

// Risk level thresholds
const RISK_THRESHOLDS = {
  Low: 0.3,
  Moderate: 0.6,
  High: 0.8
};

// Recommendations for each risk level
const recommendations: RiskRecommendations = {
  Low: [
    "Maintain healthy lifestyle",
    "Annual glucose checkup",
    "Balanced diet",
    "Regular exercise"
  ],
  Moderate: [
    "Consult doctor",
    "Quarterly glucose monitoring",
    "Weight management",
    "Reduce sugar intake"
  ],
  High: [
    "Immediate medical consultation",
    "Monthly glucose tests",
    "Strict diet control",
    "Regular exercise",
    "HbA1c testing"
  ],
  "Very High": [
    "Urgent medical attention",
    "Weekly glucose monitoring",
    "Diabetes specialist consultation",
    "Comprehensive lifestyle changes",
    "Medication review"
  ]
};

// Convert form data to API format
const convertFormDataToApiFormat = (
  formData: DiabetesPredictionFormData,
  isFasting: boolean
) => {
  return {
    Age: formData.Age,
    Gender: formData.Gender === 1 ? "Male" : "Female",
    Polyuria: formData.Polyuria === 1 ? "Yes" : "No",
    Polydipsia: formData.Polydipsia === 1 ? "Yes" : "No",
    "sudden weight loss": formData["sudden weight loss"] === 1 ? "Yes" : "No",
    weakness: formData.weakness === 1 ? "Yes" : "No",
    Polyphagia: formData.Polyphagia === 1 ? "Yes" : "No",
    "visual blurring": formData["visual blurring"] === 1 ? "Yes" : "No",
    "delayed healing": formData["delayed healing"] === 1 ? "Yes" : "No",
    "partial paresis": formData["partial paresis"] === 1 ? "Yes" : "No",
    "FamilyDiabetesHistory": formData.FamilyDiabetesHistory === 1 ? "Yes" : "No",
    "Obesity": formData.Obesity === 1 ? "Yes" : "No",
    Scenario: isFasting ? "Fasting" : "Postprandial"
  };
};

// Generate realistic mock response
const generateMockResponse = (
  formData: DiabetesPredictionFormData,
  isFasting: boolean
): PredictionResult => {
  const weights = isFasting ? featureImportance.fasting : featureImportance.postprandial;
  let score = 0;
  let totalWeight = 0;

  // Calculate weighted score
  Object.entries(weights).forEach(([feature, weight]) => {
    if (formData[feature as keyof DiabetesPredictionFormData] === 1) {
      score += weight;
    }
    totalWeight += weight;
  });

  // Age factor
  const ageFactor = formData.Age >= 45 ? 0.15 : formData.Age >= 30 ? 0.1 : 0.05;
  score += ageFactor;
  totalWeight += ageFactor;

  // Family history factor
  if (formData.FamilyDiabetesHistory === 1) {
    score += 0.2;
    totalWeight += 0.2;
  }

  // Normalize probability
  const probability = Math.min(0.99, score / totalWeight);
  const prediction = probability > 0.6 ? 1 : 0;

  // Determine risk level
  let riskLevel: RiskLevel = "Low";
  if (probability > RISK_THRESHOLDS["Very High"]) riskLevel = "Very High";
  else if (probability > RISK_THRESHOLDS.High) riskLevel = "High";
  else if (probability > RISK_THRESHOLDS.Moderate) riskLevel = "Moderate";

  return {
    prediction,
    probability,
    riskLevel,
    recommendations: recommendations[riskLevel],
    scenario: isFasting ? "fasting" : "postprandial",
    featureImportance: weights,
    explanation: `Based on your ${isFasting ? "fasting" : "post-meal"} symptoms and profile`,
    timestamp: new Date().toISOString()
  };
};

// Main prediction function
export const predictDiabetes = async (
  formData: DiabetesPredictionFormData,
  isFasting: boolean
): Promise<PredictionResult> => {
  try {
    // Convert data for API
    const apiFormData = convertFormDataToApiFormat(formData, isFasting);
    
    // API endpoint
    const endpoint = isFasting
      ? "https://dbdeploy-2.onrender.com/predict-fasting"
      : "https://dbdeploy-2.onrender.com/predict-postprandial";

    // Real API call
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiFormData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("API call failed, using mock response:", error);
    return generateMockResponse(formData, isFasting);
  }
};