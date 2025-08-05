import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/generate-text', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of result.stream) {
      // CORRECTED: The text is now retrieved by calling the text() method
      const textChunk = chunk.text();
      res.write(textChunk);
    }
    
    res.end();

  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});