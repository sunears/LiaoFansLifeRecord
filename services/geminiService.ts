import { GoogleGenAI, Type } from "@google/genai";
import { CardData, ResolutionResult, Scenario } from '../types';

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateScenario = async (turn: number, currentStats: any): Promise<Scenario> => {
  try {
    const ai = getAI();
    const prompt = `
      You are the "Game Master" for a game based on the Chinese classic "Liaofan's Four Lessons" (了凡四训).
      Generate a short life scenario (karma test) for the player in SIMPLIFIED CHINESE (简体中文).
      Current Turn: ${turn}.
      Player Stats: Merit ${currentStats.merit}, Wisdom ${currentStats.wisdom}.
      
      The scenario should be a moral dilemma or a challenge related to:
      - Temptation (wealth, lust, fame)
      - Interpersonal conflict (anger, jealousy, slander)
      - Hardship (illness, loss, failure)
      
      It can be set in modern times or ancient China (keep it consistent but accessible).
      Keep the description concise (under 50 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.INTEGER },
            context: { type: Type.STRING },
          },
          required: ["title", "description", "difficulty"],
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as Scenario;

  } catch (error) {
    console.error("Gemini generation failed", error);
    // Fallback scenario in Chinese
    return {
      title: "宁静的一天",
      description: "今日无事发生，但闲居恐滋生杂念。你独自静坐，思绪渐渐飘远。",
      difficulty: 1,
      context: "Idle mind test"
    };
  }
};

export const resolveAction = async (scenario: Scenario, card: CardData): Promise<ResolutionResult> => {
  try {
    const ai = getAI();
    const prompt = `
      The player encounters this scenario: "${scenario.title}: ${scenario.description}".
      Hidden Context: ${scenario.context || ''}.
      
      The player uses the card: "${card.name}" (${card.type}).
      Card Description: "${card.description}".
      Card Quote: "${card.quote}".
      
      Evaluate the outcome based on the philosophy of "Liaofan's Four Lessons".
      Respond in SIMPLIFIED CHINESE (简体中文).
      
      - Did the card choice address the root of the problem?
      - Was the intention pure?
      
      Provide:
      - narrative: A 1-2 sentence outcome story (Chinese).
      - meritChange: Integer (-10 to +20).
      - wisdomChange: Integer (-5 to +10).
      - destinyChange: Integer (-10 to +10).
      - critique: A very short (1 sentence) wise comment in the style of a Zen master or Liaofan (Chinese).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            narrative: { type: Type.STRING },
            meritChange: { type: Type.INTEGER },
            wisdomChange: { type: Type.INTEGER },
            destinyChange: { type: Type.INTEGER },
            critique: { type: Type.STRING },
          },
          required: ["narrative", "meritChange", "wisdomChange", "destinyChange", "critique"],
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as ResolutionResult;

  } catch (error) {
    console.error("Gemini resolution failed", error);
    return {
      narrative: "你做出了选择，但天意难测。因果将在冥冥中自行流转。",
      meritChange: 1,
      wisdomChange: 0,
      destinyChange: 0,
      critique: "诚心是改变命运的关键。"
    };
  }
};