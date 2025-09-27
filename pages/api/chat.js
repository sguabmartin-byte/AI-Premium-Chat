
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du är en vänlig AI-kompis." },
        { role: "user", content: message },
      ],
      max_tokens: 200,
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ reply: "AI-fel, försök igen senare." });
  }
}
