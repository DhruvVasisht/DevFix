"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from'@/components/ui/tooltip';


interface ActionTooltipProps{
    label:string;
    children: React.ReactNode;
    side?:"top" | "left" | "bottom" | "right";
    alight?:"start" | "end" | "center";
}

export const ActionTooltip= ({
    label,
    children,
    side,
    alight 
}:ActionTooltipProps) => {
    
};
