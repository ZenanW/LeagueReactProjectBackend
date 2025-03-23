import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const callChatGPT = async (prompt) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/chat/completions";
  
    try {
      const response = await axios.post(
        url,
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful champion-guessing assistant." },
            { role: "user", content: prompt },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      return response.data.choices[0].message.content;
    } catch (err) {
      console.error("ChatGPT API error:", err.response?.data || err.message);
      throw err;
    }
  };