// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyD04qtklbUEueZv8rFuaz_t9SY3ZpQGy7Y";

/**
 * Generates a response from Gemini using the provided prompt.
 * @param {string} prompt - The user input to send to Gemini.
 */
async function generateGeminiResponse(prompt) {
  try {
    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-1.5-flash"; // Use free tier model
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    let fullResponse = "";

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    for await (const chunk of response) {
      fullResponse += chunk.text;
    }
    console.log(fullResponse);
    return fullResponse;
  } catch (error) {
    console.error("Gemini API error:", error);
  }
}

export default generateGeminiResponse;
