import { GoogleGenAI } from "@google/genai";
import { WorkoutPlanRequest, NutritionRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = 'gemini-2.5-flash';

export const generateWorkoutPlan = async (request: WorkoutPlanRequest): Promise<string> => {
  try {
    const prompt = `
      Act as an elite strength and conditioning coach. Create a comprehensive ${request.duration}-week workout plan for an athlete with the following profile:
      - Goal: ${request.goal}
      - Fitness Level: ${request.fitnessLevel}
      - Frequency: ${request.daysPerWeek} days per week
      - Available Equipment: ${request.equipment}

      Please format the response in clean Markdown. Include:
      1. A brief overview of the phase.
      2. A weekly schedule breakdown (e.g., Day 1: Upper Body, Day 2: Rest).
      3. Specific exercises with sets and reps for a typical week.
      4. Warm-up and cool-down recommendations.
      5. Important safety tips.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Failed to generate workout plan. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI Coach. Please check your API key and connection.";
  }
};

export const generateNutritionAdvice = async (request: NutritionRequest): Promise<string> => {
  try {
    const prompt = `
      Act as a sports nutritionist. Create a meal guide for an athlete:
      - Primary Goal: ${request.goal}
      - Dietary Restrictions: ${request.dietaryRestrictions || "None"}
      - Meals Per Day: ${request.mealsPerDay}
      ${request.calories ? `- Target Calories: ${request.calories}` : ''}

      Format in Markdown. Include:
      1. Macro-nutrient focus (Protein/Carb/Fat balance).
      2. A sample one-day meal plan with specific food examples and estimated gram quantities for a balanced athlete diet.
      3. Hydration strategy.
      4. Pre-workout and Post-workout nutrition timing.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Failed to generate nutrition advice.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error getting nutrition advice.";
  }
};

export const generateRecoveryPlan = async (injuryType: string, painLevel: number): Promise<string> => {
  try {
    const prompt = `
      Act as a physical therapist. I have a ${injuryType} injury. Current pain level is ${painLevel}/10.
      
      Provide a recovery guideline in Markdown:
      1. Immediate actions (RICE method, etc).
      2. 3 safe, low-impact rehabilitation exercises suitable for this stage.
      3. Warning signs to stop exercising.
      4. Estimated recovery timeline based on general medical data.
      
      Disclaimer: Start with "This is AI advice, see a doctor for medical diagnosis."
    `;
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Unable to generate recovery plan.";
  } catch (error) {
    return "Error generating recovery plan.";
  }
};

export const chatWithCoach = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: modelId,
      history: history,
      config: {
        systemInstruction: "You are 'Coach Gemini', an expert, motivating, and data-driven sports performance coach. Keep answers concise, actionable, and encouraging.",
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm having trouble thinking right now. Ask me again in a moment.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Connection error. Please try again.";
  }
};