import { DiabetesPredictionFormData, PredictionResult } from "../types/formTypes";

// Feature importance data based on the provided image
const featureImportance = {
  "Polyuria": 0.2238,
  "Polydipsia": 0.2238, // Same as Polyuria in the image
  "Age": 0.15,
  "Gender": 0.05,
  "sudden weight loss": 0.12,
  "partial paresis": 0.10,
  "irritability": 0.08,
  "Alopecia": 0.06,
  "delayed healing": 0.11,
  "Itching": 0.07,
  "visual blurring": 0.09,
  "muscle stiffness": 0.05,
  "Polyphagia": 0.10,
  "weakness": 0.13,
  "Obesity": 0.07
};

// Helper function to convert numeric values to strings
const convertFormDataToApiFormat = (formData: DiabetesPredictionFormData) => {
  return {
    Age: formData.Age,
    Gender: formData.Gender === 1 ? "Male" : "Female",
    Polyuria: formData.Polyuria === 1 ? "Yes" : "No",
    Polydipsia: formData.Polydipsia === 1 ? "Yes" : "No",
    "sudden weight loss": formData["sudden weight loss"] === 1 ? "Yes" : "No",
    weakness: formData.weakness === 1 ? "Yes" : "No",
    Polyphagia: formData.Polyphagia === 1 ? "Yes" : "No",
    "visual blurring": formData["visual blurring"] === 1 ? "Yes" : "No",
    Itching: formData.Itching === 1 ? "Yes" : "No",
    Irritability: formData.Irritability === 1 ? "Yes" : "No",
    "delayed healing": formData["delayed healing"] === 1 ? "Yes" : "No",
    "partial paresis": formData["partial paresis"] === 1 ? "Yes" : "No",
    "muscle stiffness": formData["muscle stiffness"] === 1 ? "Yes" : "No",
    Alopecia: formData.Alopecia === 1 ? "Yes" : "No",
    Obesity: formData.Obesity === 1 ? "Yes" : "No"
  };
};

// Enhanced mock response with feature importance
const mockPredictionResponse = (formData: DiabetesPredictionFormData): PredictionResult => {
  // Calculate a score based on feature importance and user inputs
  let score = 0;
  let totalImportance = 0;
  
  Object.entries(featureImportance).forEach(([feature, importance]) => {
    if (formData[feature as keyof DiabetesPredictionFormData] === 1) {
      score += importance;
    }
    totalImportance += importance;
  });

  // Normalize the score to be between 0 and 1
  const normalizedScore = score / totalImportance;
  
  // Determine prediction and probability
  const prediction = normalizedScore > 0.5 ? 1 : 0;
  const probability = prediction === 1 
    ? 0.5 + (normalizedScore * 0.5) 
    : 0.5 - (normalizedScore * 0.5);

  return {
    prediction,
    probability,
    featureImportance
  };
};

export const predictDiabetes = async (formData: DiabetesPredictionFormData): Promise<PredictionResult> => {
  try {
    // Convert the form data to the API format
    const apiFormData = convertFormDataToApiFormat(formData);
    console.log("Sending data to API:", apiFormData);
    
    const response = await fetch("https://dbdeploy-2.onrender.com/predictt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiFormData),
    });

    if (!response.ok) {
      console.error(`API error status: ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);
    return result;
  } catch (error) {
    console.error("Error predicting diabetes:", error);
    
    // Fall back to mock response when API is unavailable
    console.log("Using mock prediction response due to API error");
    return mockPredictionResponse(formData);
  }
};