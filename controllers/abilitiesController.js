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

export const getAbilityStats = async (req, res) => {
    try {
        console.log("Fetching most chosen abilities for each slot...");

        const query = `
            WITH MostCommonAbilities AS (
                SELECT * FROM (
                    SELECT 
                        'Q' AS slot, 
                        Q_ability AS ability, 
                        Q_champion AS champion, 
                        COUNT(*) AS frequency
                    FROM ability_selections
                    WHERE Q_ability IS NOT NULL
                    GROUP BY Q_ability, Q_champion
                    ORDER BY frequency DESC
                    LIMIT 1
                ) AS Q_abilities

                UNION ALL

                SELECT * FROM (
                    SELECT 
                        'W' AS slot, 
                        W_ability AS ability, 
                        W_champion AS champion, 
                        COUNT(*) AS frequency
                    FROM ability_selections
                    WHERE W_ability IS NOT NULL
                    GROUP BY W_ability, W_champion
                    ORDER BY frequency DESC
                    LIMIT 1
                ) AS W_abilities

                UNION ALL

                SELECT * FROM (
                    SELECT 
                        'E' AS slot, 
                        E_ability AS ability, 
                        E_champion AS champion, 
                        COUNT(*) AS frequency
                    FROM ability_selections
                    WHERE E_ability IS NOT NULL
                    GROUP BY E_ability, E_champion
                    ORDER BY frequency DESC
                    LIMIT 1
                ) AS E_abilities

                UNION ALL

                SELECT * FROM (
                    SELECT 
                        'R' AS slot, 
                        R_ability AS ability, 
                        R_champion AS champion, 
                        COUNT(*) AS frequency
                    FROM ability_selections
                    WHERE R_ability IS NOT NULL
                    GROUP BY R_ability, R_champion
                    ORDER BY frequency DESC
                    LIMIT 1
                ) AS R_abilities
            )
            SELECT * FROM MostCommonAbilities;
        `;

        console.log("Executing Query:", query);
        const result = await pool.query(query);
        console.log("Database Query Result:", result.rows);

        res.json({ mostChosenAbilities: result.rows });
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        res.status(500).json({ error: "Database error", details: error.message });
    }
};


