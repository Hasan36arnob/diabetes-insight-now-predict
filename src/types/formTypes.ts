
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
  Polyuria: "অত্যধিক প্রস্রাব - অস্বাভাবিকভাবে বেশি পরিমাণে প্রস্রাব হওয়া",
  Polydipsia: "অত্যধিক তৃষ্ণা - দীর্ঘ সময় ধরে অতিরিক্ত তৃষ্ণা অনুভব করা",
  Polyphagia: "অত্যধিক ক্ষুধা - অস্বাভাবিক রকম বেশি খিদে পাওয়া",
  "partial paresis": "আংশিক পক্ষাঘাত - পেশীর স্বেচ্ছাকৃত গতিবিধি প্রভাবিত করে এমন হালকা থেকে মাঝারি মাত্রার দুর্বলতা",
  Alopecia: "চুল পড়া - আংশিক বা সম্পূর্ণ চুল পড়ে যাওয়া"
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

// Added Bengali translations for form elements
export const formTranslations = {
  age: "বয়স",
  gender: "লিঙ্গ",
  female: "নারী",
  male: "পুরুষ",
  symptoms: "লক্ষণসমূহ",
  symptomsDescription: "আপনি নিম্নলিখিত লক্ষণগুলি অনুভব করেন কিনা তা নির্দেশ করুন:",
  calculateRisk: "ডায়াবেটিস ঝুঁকি নির্ধারণ করুন",
  pleaseWait: "অপেক্ষা করুন...",
  yes: "হ্যাঁ",
  no: "না",
  diabetesRiskPrediction: "ডায়াবেটিস ঝুঁকি পরীক্ষণ",
  fillForm: "আপনার ডায়াবেটিস ঝুঁকি যাচাই করতে নিচের ফরমটি পূরণ করুন",
  disclaimer: "এই টুল শুধুমাত্র তথ্যমূলক উদ্দেশ্যে এবং চিকিৎসা পরামর্শের বিকল্প নয়",
  footer: "© ২০২৫ ডায়াবেটিস ইনসাইট - পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়"
};
