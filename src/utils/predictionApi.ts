
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

export const predictDiabetes = async (formData: DiabetesPredictionFormData): Promise<PredictionResult> => {
  try {
    // Convert the form data to the API format
    const apiFormData = convertFormDataToApiFormat(formData);
    
    const response = await fetch("https://dbdeploy-2.onrender.com/predict", {
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
    console.error("Error predicting diabetes:", error);
    throw error;
  }
};
