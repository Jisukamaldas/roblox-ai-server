import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "YOUR_OPENAI_API_KEY"; // 🔴 Put your key here

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).send("Error");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});