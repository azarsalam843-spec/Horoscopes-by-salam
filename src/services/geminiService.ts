import { GoogleGenAI, Type } from '@google/genai';
import { HoroscopeData } from '../types';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getDailyHoroscope(signName: string): Promise<HoroscopeData> {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const prompt = `You are an expert, insightful, and empathetic astrologer. 
Generate a daily horoscope for ${signName} for today, ${today}.
Provide a general overview, insights into love/relationships, career/money advice, 3 lucky numbers, a lucky color, and a one-word mood.
Make it engaging, mystical, but practical.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.STRING,
              description: 'A 2-3 sentence general overview of the day for this sign.',
            },
            love: {
              type: Type.STRING,
              description: 'Advice or predictions regarding love and relationships.',
            },
            career: {
              type: Type.STRING,
              description: 'Advice or predictions regarding career and finances.',
            },
            luckyNumbers: {
              type: Type.ARRAY,
              items: { type: Type.INTEGER },
              description: 'Exactly 3 lucky numbers for the day.',
            },
            luckyColor: {
              type: Type.STRING,
              description: 'A lucky color for the day.',
            },
            mood: {
              type: Type.STRING,
              description: 'A one-word mood for the day (e.g., "Energetic", "Reflective").',
            },
          },
          required: ['overview', 'love', 'career', 'luckyNumbers', 'luckyColor', 'mood'],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error('No response from AI');

    const data = JSON.parse(text);
    
    return {
      sign: signName,
      date: today,
      ...data,
    };
  } catch (error) {
    console.error('Error generating horoscope:', error);
    throw new Error('Failed to consult the stars. Please try again later.');
  }
}
