
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

export const symptomTranslations: Record<string, string> = {
  Polyuria: "অত্যধিক প্রস্রাব (বারবার প্রস্রাব করতে হওয়া)",
  Polydipsia: "অত্যধিক তৃষ্ণা (বারবার পানি পান করতে হওয়া)",
  "sudden weight loss": "হঠাৎ ওজন কমে যাওয়া",
  weakness: "দুর্বলতা",
  Polyphagia: "অত্যধিক ক্ষুধা (বারবার খিদে পাওয়া)",
  "visual blurring": "দৃষ্টি ঝাপসা হওয়া",
  Itching: "চুলকানি",
  Irritability: "খিটখিটে মেজাজ",
  "delayed healing": "ক্ষত নিরাময় হতে দেরি হওয়া",
  "partial paresis": "আংশিক পেশী দুর্বলতা",
  "muscle stiffness": "পেশী শক্ত হয়ে যাওয়া",
  Alopecia: "চুল পড়া",
  Obesity: "স্থূলতা"
};

export type RiskLevel = "Low" | "Moderate" | "High" | "Very High";

export const riskLevelBangla: Record<RiskLevel, string> = {
  "Low": "কম",
  "Moderate": "মাঝারি",
  "High": "উচ্চ",
  "Very High": "খুব উচ্চ"
};
