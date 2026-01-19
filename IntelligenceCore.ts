
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
    // Check for common falsy values in environment strings before calling API
    if (!process.env.API_KEY || process.env.API_KEY === 'undefined' || process.env.API_KEY === '' || process.env.API_KEY === 'null') {
      return "Error: No API_KEY detected. Please configure the API_KEY environment variable in your Vercel settings.";
    }

    try {
      // Corrected: Initializing GoogleGenAI using named parameter with direct process.env.API_KEY reference
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
