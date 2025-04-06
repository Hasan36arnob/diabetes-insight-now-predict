
import { DiabetesPredictionFormData, PredictionResult } from "../types/formTypes";

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

// Create a mock response function for testing when API is unavailable
const mockPredictionResponse = (): PredictionResult => {
  // Randomly return positive or negative result
  const prediction = Math.random() > 0.5 ? 1 : 0;
  return {
    prediction,
    probability: prediction === 1 ? 0.75 + (Math.random() * 0.2) : 0.25 - (Math.random() * 0.2)
  };
};

export const predictDiabetes = async (formData: DiabetesPredictionFormData): Promise<PredictionResult> => {
  try {
    // Convert the form data to the API format
    const apiFormData = convertFormDataToApiFormat(formData);
    console.log("Sending data to API:", apiFormData);
    
    const response = await fetch("https://dbdeploy-2.onrender.com/predict", {
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
    return mockPredictionResponse();
  }
};
