
import React from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { medicalTermExplanations } from "../types/formTypes";

interface InfoTooltipProps {
  term: string;
}

const InfoTooltip = ({ term }: InfoTooltipProps) => {
  const explanation = medicalTermExplanations[term] || "Medical term";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center ml-1 cursor-help text-medical-primary">
            <HelpCircle size={14} />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
