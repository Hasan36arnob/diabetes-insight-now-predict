
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionResult } from "../types/formTypes";
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
          <p className="mt-2 text-sm text-muted-foreground">Analyzing your data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6 border-2 border-destructive/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-destructive">Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  const isDiabetic = result.prediction === 1;
  const probability = result.probability ? Math.round(result.probability * 100) : 0;

  return (
    <Card className={`mt-6 border-2 ${
      isDiabetic ? "border-medical-negative/50" : "border-medical-positive/50"
    }`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg">Prediction Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <h3 className={`text-xl font-bold ${
            isDiabetic ? "text-medical-negative" : "text-medical-positive"
          }`}>
            {isDiabetic ? "Positive" : "Negative"} for Diabetes
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isDiabetic 
              ? "The model predicts that you may have diabetes." 
              : "The model predicts that you likely don't have diabetes."
            }
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            This is not a medical diagnosis. Please consult with a healthcare professional.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
