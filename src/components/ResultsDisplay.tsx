
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionResult, RiskLevel, riskLevelBangla } from "../types/formTypes";
import { Loader2 } from "lucide-react";

interface ResultsDisplayProps {
  result: PredictionResult | null;
  isLoading: boolean;
  error: string | null;
}

const ResultsDisplay = ({ result, isLoading, error }: ResultsDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="mt-6 border-2">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[120px]">
          <Loader2 className="h-8 w-8 animate-spin text-medical-primary" />
          <p className="mt-2 text-sm text-muted-foreground">আপনার তথ্য বিশ্লেষণ করা হচ্ছে...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6 border-2 border-destructive/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-destructive">ত্রুটি (Error)</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  // Calculate risk level based on probability
  const getRiskLevel = (probability: number): RiskLevel => {
    if (probability < 0.3) return "Low";
    if (probability < 0.6) return "Moderate";
    if (probability < 0.8) return "High";
    return "Very High";
  };

  const riskLevel = getRiskLevel(result.probability);
  
  const riskColorMap = {
    "Low": "text-green-600 border-green-500/50",
    "Moderate": "text-yellow-600 border-yellow-500/50",
    "High": "text-orange-600 border-orange-500/50",
    "Very High": "text-red-600 border-red-500/50",
  };
  
  return (
    <Card className={`mt-6 border-2 ${riskColorMap[riskLevel]}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg">ফলাফল (Result)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <h3 className={`text-xl font-bold ${riskLevel === "Low" ? "text-green-600" : 
            riskLevel === "Moderate" ? "text-yellow-600" : 
            riskLevel === "High" ? "text-orange-600" : "text-red-600"}`}>
            ডায়াবেটিস ঝুঁকি: {riskLevelBangla[riskLevel]} ({riskLevel})
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {riskLevel === "Low" 
              ? "মডেল অনুমান করে যে আপনার ডায়াবেটিসের ঝুঁকি কম।" 
              : riskLevel === "Moderate"
              ? "মডেল অনুমান করে যে আপনার ডায়াবেটিসের মাঝারি ঝুঁকি রয়েছে।"
              : riskLevel === "High"
              ? "মডেল অনুমান করে যে আপনার ডায়াবেটিসের উচ্চ ঝুঁকি রয়েছে।"
              : "মডেল অনুমান করে যে আপনার ডায়াবেটিসের খুব উচ্চ ঝুঁকি রয়েছে।"
            }
          </p>
          <div className="mt-4 p-2 bg-gray-50 rounded-md">
            <p className="text-xs text-muted-foreground">
              এটি চিকিৎসা নির্ণয় নয়। অনুগ্রহ করে একজন স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করুন।
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
