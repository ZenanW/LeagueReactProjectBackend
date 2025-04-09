import { callChatGPT } from "../config/openAI.js"; 

const handleStartSession = (req, res) => {
    res.status(200).json({ message: "AI guessing session started!" });
};
  
const handleAskQuestion = async (req, res) => {
    const { question, previousContext } = req.body;

    try {
      // Build the prompt (you can make this smarter by including previous context)
      const chatHistory = previousContext
      ? previousContext.split("\n").map((line) => {
          const [sender, ...messageParts] = line.split(":");
          return {
            sender: sender.trim(),
            message: messageParts.join(":").trim()
          };
        })
      : [];

      const prompt = question;
      const result = await callChatGPT(prompt, chatHistory);
      res.status(200).json(result); 
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
  