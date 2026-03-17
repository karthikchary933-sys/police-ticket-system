import { GoogleGenAI } from "@google/genai";
import { Category, Priority } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function suggestTicketDetails(description: string): Promise<{ category: Category; priority: Priority }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following IT issue description from a police officer and suggest the most appropriate Category (Hardware, Software, Network, Access, Application) and Priority (Low, Medium, High, Critical). 
      
      Issue Description: "${description}"
      
      Return only a JSON object with "category" and "priority" keys.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      category: result.category || 'Hardware',
      priority: result.priority || 'Medium'
    };
  } catch (error) {
    console.error("AI suggestion failed:", error);
    return { category: 'Hardware', priority: 'Medium' };
  }
}
