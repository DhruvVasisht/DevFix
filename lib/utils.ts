import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to detect if text contains code
export function containsCode(text: string): boolean {
  // Check for code block syntax (```code```)
  if (/```[\s\S]*?```/.test(text)) {
    return true
  }

  // Check for inline code syntax (`code`)
  if (/`[^`]+`/.test(text)) {
    return true
  }

  // Check for common programming patterns
  const codePatterns = [
    /function\s+\w+\s*$$[^)]*$$\s*{/, // JavaScript function
    /const|let|var\s+\w+\s*=/, // JavaScript variable declaration
    /import\s+.*\s+from\s+['"].*['"]/, // ES6 import
    /class\s+\w+/, // Class declaration
    /<\w+[^>]*>.*<\/\w+>/, // HTML tags
    /\w+\s*$$$$\s*=>\s*{/, // Arrow function
    /if\s*$$[^)]*$$\s*{/, // if statement
    /for\s*$$[^)]*$$\s*{/, // for loop
    /^\s*#include/m, // C/C++ include
    /^\s*package\s+\w+/m, // Java/Kotlin package
    /^\s*def\s+\w+\s*\(/m, // Python function
    /^\s*from\s+\w+\s+import/m, // Python import
    /^\s*public\s+class/m, // Java class
  ]

  return codePatterns.some((pattern) => pattern.test(text))
}
