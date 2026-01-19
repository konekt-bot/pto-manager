
import { GoogleGenAI } from "@google/genai";
import { ModelType } from "./types";

export class GeminiService {
  private static instance: GeminiService;

  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async askQuestion(prompt: string, model: ModelType = ModelType.FLASH): Promise<string> {
    // Corrected: Comprehensive check for valid API_KEY environment variable
    if (!process.env.API_KEY || process.env.API_KEY === 'undefined' || process.env.API_KEY === '' || process.env.API_KEY === 'null') {
      return "Error: No Gemini API Key found. Please add your API_KEY to your environment variables or Vercel settings.";
    }

    try {
      // Corrected: Use direct process.env.API_KEY for initialization as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.95,
          topK: 64,
        }
      });

      return response.text || "No response received from the model.";
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      if (error.message?.includes("Requested entity was not found")) {
        return "Error: Requested model was not found. Check your API key and region.";
      }
      
      return `Error: ${error.message || "An unexpected error occurred while communicating with Gemini."}`;
    }
  }
}
