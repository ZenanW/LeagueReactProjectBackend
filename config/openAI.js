import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const firstMessages = [
  "Yo summoner! I'm ready to guess your main. First up — is your champ melee or ranged?",
  "Alright, hit me with your first hint — I’ll guess it fast.",
  "Ready to play League 20 Questions? Let’s go.",
  "Melee? Ranged? Throw me a bone here.",
  "Don't tell me it’s Teemo again...",
  "Let’s narrow it down — AP or AD?",
  "Alright, who's the poor soul you're one-tricking this season?"
];

export const callChatGPT = async (prompt, chatHistory = []) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const randomFirstMessage = firstMessages[Math.floor(Math.random() * firstMessages.length)];

    // Build base message history
    const originalMessages = [
      {
        role: "system",
        content: `You're a smart League of Legends player who guesses champions through clever questions. Ask one question at a time and keep the tone casual, meme-friendly, and confident.`
      },
      ...(chatHistory.length === 0
        ? [{ role: "assistant", content: randomFirstMessage }]
        : chatHistory.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.message
          }))
      ),
      { role: "user", content: prompt }
    ];

    // Get normal AI reply
    const response = await axios.post(
      url,
      {
        model: "gpt-4",
        messages: originalMessages,
        max_tokens: 150,
        temperature: 1.0,
        frequency_penalty: 0.2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;

    // Get soft guess from AI
    const softGuessCompletion = await axios.post(
      url,
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You're a League of Legends champion guesser. Based on the previous conversation, your task is to respond with the **single champion name** you are currently leaning toward. Be as accurate as you can, even if you're not fully confident. Respond with just the name.`
          },
          ...originalMessages,
          {
            role: "user",
            content: "What champion are you currently thinking of right now? Just the name."
          }
        ],
        temperature: 0.3,
        max_tokens: 10,
        stop: ["\n"]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const softGuess = softGuessCompletion.data.choices[0].message.content.trim();

    return {
      aiReply,
      currentGuess: softGuess
    };

  } catch (err) {
    console.error("ChatGPT API error:", err.response?.data || err.message);
    throw err;
  }
};
