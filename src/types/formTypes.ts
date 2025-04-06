
export interface DiabetesPredictionFormData {
  Age: number;
  Gender: number; // 0 for Female, 1 for Male
  Polyuria: number; // 0 for No, 1 for Yes
  Polydipsia: number; // 0 for No, 1 for Yes
  "sudden weight loss": number; // 0 for No, 1 for Yes
  weakness: number; // 0 for No, 1 for Yes
  Polyphagia: number; // 0 for No, 1 for Yes
  "visual blurring": number; // 0 for No, 1 for Yes
  Itching: number; // 0 for No, 1 for Yes
  Irritability: number; // 0 for No, 1 for Yes
  "delayed healing": number; // 0 for No, 1 for Yes
  "partial paresis": number; // 0 for No, 1 for Yes
  "muscle stiffness": number; // 0 for No, 1 for Yes
  Alopecia: number; // 0 for No, 1 for Yes
  Obesity: number; // 0 for No, 1 for Yes
}

export interface PredictionResult {
  prediction: number;
  probability: number;
}

export const medicalTermExplanations: Record<string, string> = {
  Polyuria: "Excessive or abnormally large production of urine",
  Polydipsia: "Excessive thirst that lasts for prolonged periods of time",
  Polyphagia: "Excessive hunger or increased appetite",
  "partial paresis": "Mild to moderate degree of weakness, affecting the voluntary movement of a muscle",
  Alopecia: "Partial or complete hair loss"
};
