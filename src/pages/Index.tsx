
import React from "react";
import DiabetesPredictionForm from "../components/DiabetesPredictionForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <div className="min-h-[100dvh] bg-medical-secondary flex flex-col">
      <header className="bg-medical-primary text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold text-center">Diabetes Insight</h1>
      </header>
      
      <ScrollArea className="flex-1 p-4">
        <div className="container max-w-md mx-auto pb-20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Diabetes Risk Prediction</h2>
            <p className="text-sm text-gray-600">
              Fill in the form below to assess your diabetes risk
            </p>
            <p className="text-xs text-gray-500 mt-1">
              This tool is for informational purposes only and does not replace medical advice
            </p>
          </div>
          
          <DiabetesPredictionForm />
        </div>
      </ScrollArea>
      
      <footer className="bg-white py-3 px-4 text-center border-t text-xs text-gray-500 fixed bottom-0 w-full">
        <p>© 2025 Diabetes Insight - Not a substitute for professional medical advice</p>
      </footer>
    </div>
  );
};

export default Index;
