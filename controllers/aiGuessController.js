import { callChatGPT } from "../config/openAI.js"; 

const handleStartSession = (req, res) => {
    res.status(200).json({ message: "AI guessing session started!" });
};
  
const handleAskQuestion = async (req, res) => {
    const { question, previousContext } = req.body;

    try {
      // Build the prompt (you can make this smarter by including previous context)
      const prompt = previousContext
        ? `Previous conversation: ${previousContext}\nPlayer asks: ${question}\nWhat champion is being described?`
        : `The player asks: ${question}\nGuess which League of Legends champion they are describing. Respond with your guess and one follow-up question.`;
  
      const aiReply = await callChatGPT(prompt);
  
      res.status(200).json({ aiReply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong when querying the AI." });
    }
}
  
const aiGuessController = {
    handleStartSession,
    handleAskQuestion,
};
  
export default aiGuessController;
  