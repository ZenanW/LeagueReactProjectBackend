import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure __dirname works in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to champion data files
const CHAMPIONS_FILE = path.join(__dirname, '../data/champions.json');
const DAILY_CHAMPIONS_FILE = path.join(__dirname, '../data/daily_champions.json');

export const getDailyChampions = () => {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // 1️⃣ **Check if daily_champions.json exists**
        if (fs.existsSync(DAILY_CHAMPIONS_FILE)) {
            const dailyFileContent = fs.readFileSync(DAILY_CHAMPIONS_FILE, 'utf8');

            if (dailyFileContent.trim()) {
                const dailyData = JSON.parse(dailyFileContent);

                // If the stored date matches today, return the existing champions
                if (dailyData.date === today) {
                    console.log("✅ Returning stored daily champions:", dailyData.champions);
                    return dailyData.champions;
                }
            }
        }

        // 2️⃣ **If no valid daily champions exist, generate new ones**
        const fileContent = fs.readFileSync(CHAMPIONS_FILE, 'utf8');

        if (!fileContent.trim()) {
            throw new Error("Champions JSON file is empty.");
        }

        const championsData = JSON.parse(fileContent);
        const championsList = championsData.champions;

        if (!Array.isArray(championsList) || championsList.length === 0) {
            throw new Error("Champions list is missing or empty.");
        }

        // Shuffle and pick 5 random champions (without modifying the original array)
        const shuffled = [...championsList].sort(() => 0.5 - Math.random());
        const selectedChampions = shuffled.slice(0, 4);

        // 3️⃣ **Save new daily champions**
        const dailyData = { date: today, champions: selectedChampions };
        fs.writeFileSync(DAILY_CHAMPIONS_FILE, JSON.stringify(dailyData, null, 2));

        console.log("✅ New daily champions selected:", selectedChampions);
        return selectedChampions;
        
    } catch (error) {
        console.error("Error reading/writing daily champions file:", error.message);
        return []; // Return an empty list to prevent crashes
    }
};

