"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
  

interface EmojiPickerProps {
    onChange: (emoji: string) => void;
}

export const EmojiPicker = ({onChange}: EmojiPickerProps) => {
    const {resolvedTheme} = useTheme()
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition cursor-pointer" size={20} />
        </PopoverTrigger>
        <PopoverContent className="border-none shadow-none drop-shadow-none bg-transparent mb-16" side="right" sideOffset={40}>
        <Picker data={data} onEmojiSelect={(emoji : {native: string})=> onChange(emoji.native)} theme={resolvedTheme} />

        </PopoverContent>
    </Popover>
  )
};
