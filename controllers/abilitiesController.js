import pool from '../config/db.js';

// Controller to save mixed abilities to the database
export const saveAbilities = async (req, res) => {
    try {
        const { abilities } = req.body;

        if (!abilities.Q || !abilities.W || !abilities.E || !abilities.R) {
            return res.status(400).json({ error: "All abilities (Q, W, E, R) and their champions must be selected." });
        }

        const query = `
            INSERT INTO ability_selections 
                (Q_ability, Q_champion, W_ability, W_champion, E_ability, E_champion, R_ability, R_champion)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const values = [
            abilities.Q.abilityName, abilities.Q.champion,
            abilities.W.abilityName, abilities.W.champion,
            abilities.E.abilityName, abilities.E.champion,
            abilities.R.abilityName, abilities.R.champion
        ];

        // Check if any value is undefined or null
        if (values.some(value => value === null || value === undefined)) {
            console.error("Missing values detected:", values);
            return res.status(400).json({ error: "Missing ability names or champions in request." });
        }

        const newEntry = await pool.query(query, values);
        res.status(201).json({ message: "Abilities stored successfully!", data: newEntry.rows[0] });
    } catch (error) {
        console.error("Error saving abilities:", error);
        res.status(500).json({ error: "Database error" });
    }
};

// Controller to get most chosen abilities stats
export const getAbilityStats = async (req, res) => {
    try {
        console.log("Fetching ability stats from database...");

        const query = `
            SELECT 
                Q_ability AS Q_ability,
                Q_champion AS Q_champion,
                W_ability AS W_ability,
                W_champion AS W_champion,
                E_ability AS E_ability,
                E_champion AS E_champion,
                R_ability AS R_ability,
                R_champion AS R_champion,
                COUNT(*) AS frequency
            FROM ability_selections
            GROUP BY Q_ability, Q_champion, W_ability, W_champion, 
                    E_ability, E_champion, R_ability, R_champion
            ORDER BY frequency DESC
            LIMIT 10;
        `;

        const result = await pool.query(query);
        
        console.log("Database Query Result:", result.rows); // Debug log

        if (result.rows.length === 0) {
            console.warn("No ability stats found in the database!");
        }

        res.json({ mostChosenCombinations: result.rows });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Database error" });
    }
};


