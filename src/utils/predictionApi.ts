
import { DiabetesPredictionFormData, PredictionResult } from "../types/formTypes";

export const predictDiabetes = async (formData: DiabetesPredictionFormData): Promise<PredictionResult> => {
  try {
    const response = await fetch("https://dbdeploy-3.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
