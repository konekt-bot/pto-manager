import { GoogleGenAI } from "@google/genai";
import { ModelType } from "./types";

export class IntelligenceCore {
  private static instance: IntelligenceCore;

  private constructor() {}

  public static getInstance(): IntelligenceCore {
    if (!IntelligenceCore.instance) {
      IntelligenceCore.instance = new IntelligenceCore();
    }
    return IntelligenceCore.instance;
  }

  public async askQuestion(prompt: string, model: ModelType = ModelType.FLASH): Promise<string> {
    const apiKey = process.env.API_KEY;
    
    // Check for common falsy values in environment strings
    if (!apiKey || apiKey === 'undefined' || apiKey === '' || apiKey === 'null') {
      return "Error: No API_KEY detected. Please configure the API_KEY environment variable in your Vercel settings.";
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      return response.text || "No AI output generated.";
    } catch (error: any) {
      console.error("IntelligenceCore Error:", error);
      return `AI Error: ${error.message || "Communication failure."}`;
    }
  }
}