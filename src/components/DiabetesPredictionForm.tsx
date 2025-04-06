
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DiabetesPredictionFormData, PredictionResult } from "../types/formTypes";
import { predictDiabetes } from "../utils/predictionApi";
import { useToast } from "@/components/ui/use-toast";
import ResultsDisplay from "./ResultsDisplay";
import InfoTooltip from "./InfoTooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const DiabetesPredictionForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DiabetesPredictionFormData>({
    defaultValues: {
      Age: 45,
      Gender: 0,
      Polyuria: 0,
      Polydipsia: 0,
      "sudden weight loss": 0,
      weakness: 0,
      Polyphagia: 0,
      "visual blurring": 0,
      Itching: 0,
      Irritability: 0,
      "delayed healing": 0,
      "partial paresis": 0,
      "muscle stiffness": 0,
      Alopecia: 0,
      Obesity: 0,
    }
  });

  const watchAge = watch("Age");

  const onSubmit = async (data: DiabetesPredictionFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await predictDiabetes(data);
      setResult(result);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle boolean fields with switch component
  const handleSwitchChange = (field: keyof DiabetesPredictionFormData) => (checked: boolean) => {
    setValue(field, checked ? 1 : 0);
  };

  const yesNoFields = [
    { name: "Polyuria" as const, label: "Polyuria", needsTooltip: true },
    { name: "Polydipsia" as const, label: "Polydipsia", needsTooltip: true },
    { name: "sudden weight loss" as const, label: "Sudden Weight Loss", needsTooltip: false },
    { name: "weakness" as const, label: "Weakness", needsTooltip: false },
    { name: "Polyphagia" as const, label: "Polyphagia", needsTooltip: true },
    { name: "visual blurring" as const, label: "Visual Blurring", needsTooltip: false },
    { name: "Itching" as const, label: "Itching", needsTooltip: false },
    { name: "Irritability" as const, label: "Irritability", needsTooltip: false },
    { name: "delayed healing" as const, label: "Delayed Healing", needsTooltip: false },
    { name: "partial paresis" as const, label: "Partial Paresis", needsTooltip: true },
    { name: "muscle stiffness" as const, label: "Muscle Stiffness", needsTooltip: false },
    { name: "Alopecia" as const, label: "Alopecia", needsTooltip: true },
    { name: "Obesity" as const, label: "Obesity", needsTooltip: false },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="age">Age: {watchAge}</Label>
                </div>
                <div className="pt-2">
                  <Slider
                    id="age"
                    min={1}
                    max={100}
                    step={1}
                    {...register("Age")}
                    value={[Number(watchAge)]}
                    onValueChange={(vals) => setValue("Age", Number(vals[0]))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup 
                  defaultValue="0" 
                  onValueChange={(value) => setValue("Gender", Number(value))}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Symptoms</h3>
              <p className="text-sm text-muted-foreground">Please indicate whether you experience the following symptoms:</p>
              
              {yesNoFields.map((field) => (
                <div key={field.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label htmlFor={field.name} className="text-sm">
                      {field.label}
                      {field.needsTooltip && <InfoTooltip term={field.name} />}
                    </Label>
                  </div>
                  <Switch
                    id={field.name}
                    checked={watch(field.name) === 1}
                    onCheckedChange={handleSwitchChange(field.name)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Button 
          type="submit" 
          className="w-full bg-medical-primary hover:bg-medical-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Predict Diabetes Risk"}
        </Button>
      </form>
      
      <ResultsDisplay result={result} isLoading={isLoading} error={error} />
    </div>
  );
};

export default DiabetesPredictionForm;
