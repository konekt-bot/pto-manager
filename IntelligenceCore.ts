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
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      return "Error: No Gemini API Key found in environment variables. Please check your deployment settings.";
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
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
      console.error("IntelligenceCore API Error:", error);
      
      if (error.message?.includes("Requested entity was not found")) {
        return "Error: Requested model was not found. Check your API key and region.";
      }
      
      return `Error: ${error.message || "An unexpected error occurred while communicating with Gemini."}`;
    }
  }
}