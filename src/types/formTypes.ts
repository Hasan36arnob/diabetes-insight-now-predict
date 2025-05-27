export interface BaseDiabetesPredictionFormData {
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
  FamilyDiabetesHistory: number; // 0 for No, 1 for Yes
}

export interface FastingDiabetesPredictionFormData extends BaseDiabetesPredictionFormData {
  fastingGlucose: number; // Fasting blood sugar level (mg/dL)
  lastMealTime: string; // Time since last meal (hours)
}

export interface PostprandialDiabetesPredictionFormData extends BaseDiabetesPredictionFormData {
  postprandialGlucose: number; // Postprandial blood sugar level (mg/dL)
  mealType: number; // 0: Light, 1: Moderate, 2: Heavy
  timeSinceMeal: number; // Time since meal in hours (1-2 hours)
}

export interface PredictionResult {
  prediction: number; // 0: Negative, 1: Positive
  probability: number; // Probability score (0-1)
  riskLevel: RiskLevel;
  recommendations: string[];
  scenario?: 'fasting' | 'postprandial'; // Which test was performed
  glucoseLevel?: number; // The glucose level used in prediction
  glucoseInterpretation?: string; // Interpretation of glucose level
}

export type RiskLevel = "Low" | "Moderate" | "High" | "Very High";

export const medicalTermExplanations: Record<string, string> = {
  Polyuria: "অত্যধিক প্রস্রাব - অস্বাভাবিকভাবে বেশি পরিমাণে প্রস্রাব হওয়া",
  Polydipsia: "অত্যধিক তৃষ্ণা - দীর্ঘ সময় ধরে অতিরিক্ত তৃষ্ণা অনুভব করা",
  Polyphagia: "অত্যধিক ক্ষুধা - অস্বাভাবিক রকম বেশি খিদে পাওয়া",
  "partial paresis": "আংশিক পক্ষাঘাত - পেশীর স্বেচ্ছাকৃত গতিবিধি প্রভাবিত করে এমন হালকা থেকে মাঝারি মাত্রার দুর্বলতা",
  Alopecia: "চুল পড়া - আংশিক বা সম্পূর্ণ চুল পড়ে যাওয়া",
  FamilyDiabetesHistory: "পরিবারে ডায়াবেটিসের ইতিহাস - বাবা-মা, ভাই-বোন বা নিকটাত্মীয়দের ডায়াবেটিস থাকা",
  fastingGlucose: "উপবাস রক্তে শর্করা - অন্তত ৮ ঘণ্টা না খাওয়ার পর রক্তে শর্করার মাত্রা",
  postprandialGlucose: "খাওয়ার পর রক্তে শর্করা - খাওয়ার ১-২ ঘণ্টা পর রক্তে শর্করার মাত্রা",
  mealType: "খাবারের ধরন - হালকা, মাঝারি বা ভারী খাবার",
  timeSinceMeal: "খাওয়ার পর সময় - খাওয়ার পর কত ঘণ্টা অতিবাহিত হয়েছে"
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
  Obesity: "স্থূলতা",
  FamilyDiabetesHistory: "পরিবারে ডায়াবেটিসের ইতিহাস",
  fastingGlucose: "উপবাস রক্তে শর্করা (mg/dL)",
  postprandialGlucose: "খাওয়ার পর রক্তে শর্করা (mg/dL)",
  lastMealTime: "শেষ খাবার গ্রহণের সময়",
  mealType: "খাবারের ধরন",
  timeSinceMeal: "খাওয়ার পর অতিবাহিত সময় (ঘণ্টা)"
};

export const riskLevelBangla: Record<RiskLevel, string> = {
  "Low": "কম ঝুঁকি",
  "Moderate": "মাঝারি ঝুঁকি",
  "High": "উচ্চ ঝুঁকি",
  "Very High": "অত্যন্ত উচ্চ ঝুঁকি"
};

export const recommendationTranslations: Record<string, string> = {
  doctorVisit: "ডাক্তারের সাথে পরামর্শ করুন",
  bloodTest: "রক্তে শর্করা পরীক্ষা করুন",
  lifestyleChanges: "জীবনযাত্রায় পরিবর্তন আনুন",
  regularExercise: "নিয়মিত ব্যায়াম করুন",
  balancedDiet: "সুষম খাদ্য গ্রহণ করুন",
  weightManagement: "ওজন নিয়ন্ত্রণ করুন",
  stressManagement: "মানসিক চাপ নিয়ন্ত্রণ করুন",
  regularCheckup: "নিয়মিত স্বাস্থ্য পরীক্ষা করুন",
  fastingTest: "উপবাস রক্তে শর্করা পরীক্ষা করুন",
  postprandialTest: "খাওয়ার পর রক্তে শর্করা পরীক্ষা করুন",
  hba1cTest: "HbA1c পরীক্ষা করুন (৩ মাসের গড় শর্করা মাত্রা)",
  mealPlanning: "খাদ্য পরিকল্পনা বিশেষজ্ঞের সাথে পরামর্শ করুন",
  carbMonitoring: "কার্বোহাইড্রেট গ্রহণ পর্যবেক্ষণ করুন"
};

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
  footer: "© ২০২৫ ডায়াবেটিস ইনসাইট - পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়",
  familyDiabetesHistory: "পরিবারে ডায়াবেটিসের ইতিহাস",
  familyDiabetesQuestion: "আপনার পরিবারে কি ডায়াবেটিসের ইতিহাস আছে? (বাবা-মা, ভাই-বোন)",
  resultTitle: "আপনার ডায়াবেটিস ঝুঁকি ফলাফল",
  riskProbability: "ঝুঁকির সম্ভাবনা",
  recommendations: "সুপারিশসমূহ",
  tryAgain: "আবার চেষ্টা করুন",
  errorMessage: "ফলাফল পেতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
  testType: "পরীক্ষার ধরন",
  fastingTest: "খাওয়ার আগে পরীক্ষা ",
  postprandialTest: "খাওয়ার পর পরীক্ষা (খাওয়ার ২ ঘণ্টা পর)",
  glucoseLevel: "রক্তে শর্করার মাত্রা (mg/dL)",
  lastMealTime: "শেষ খাবার গ্রহণের সময়",
  mealType: "খাবারের ধরন",
  lightMeal: "হালকা খাবার",
  moderateMeal: "মাঝারি খাবার",
  heavyMeal: "ভারী খাবার",
  timeSinceMeal: "খাওয়ার পর অতিবাহিত সময় (ঘণ্টা)"
};

export interface RiskRecommendations {
  [key: string]: string[];
}

export const riskRecommendations: RiskRecommendations = {
  "Low": [
    recommendationTranslations.lifestyleChanges,
    recommendationTranslations.regularExercise,
    recommendationTranslations.balancedDiet,
    "বছরে একবার রক্তে শর্করা পরীক্ষা করুন"
  ],
  "Moderate": [
    recommendationTranslations.doctorVisit,
    recommendationTranslations.bloodTest,
    recommendationTranslations.lifestyleChanges,
    recommendationTranslations.weightManagement,
    recommendationTranslations.fastingTest,
    "প্রতি ৬ মাসে পরীক্ষা করুন"
  ],
  "High": [
    recommendationTranslations.doctorVisit,
    recommendationTranslations.bloodTest,
    recommendationTranslations.regularCheckup,
    recommendationTranslations.stressManagement,
    recommendationTranslations.weightManagement,
    recommendationTranslations.fastingTest,
    recommendationTranslations.postprandialTest,
    "প্রতি ৩ মাসে পরীক্ষা করুন"
  ],
  "Very High": [
    recommendationTranslations.doctorVisit,
    recommendationTranslations.bloodTest,
    recommendationTranslations.regularCheckup,
    "তাত্ক্ষণিক চিকিৎসা পরামর্শ নিন",
    recommendationTranslations.lifestyleChanges,
    recommendationTranslations.stressManagement,
    recommendationTranslations.hba1cTest,
    recommendationTranslations.mealPlanning,
    recommendationTranslations.carbMonitoring,
    "মাসে অন্তত একবার পরীক্ষা করুন"
  ]
};

export const glucoseLevelInterpretation = {
  fasting: {
    normal: "সাধারণ (৭০-৯৯ mg/dL)",
    prediabetes: "প্রিডায়াবেটিস (১০০-১২৫ mg/dL)",
    diabetes: "ডায়াবেটিস (১২৬ mg/dL বা বেশি)"
  },
  postprandial: {
    normal: "সাধারণ (১৪০ mg/dL এর নিচে)",
    prediabetes: "প্রিডায়াবেটিস (১৪০-১৯৯ mg/dL)",
    diabetes: "ডায়াবেটিস (২০০ mg/dL বা বেশি)"
  }
};