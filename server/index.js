import express from 'express';
import cors from 'cors';
import { config } from 'dotenv'; // Use 'config' from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai';

config(); // Call config() to load .env variables

const app = express();
const PORT = process.env.PORT || 3001; // Use PORT from .env or default to 3001

app.use(cors());
app.use(express.json());

// Initialize the Google Generative AI client with the correct API key
const apiKey = process.env.GOOGLE_API_KEY; // Ensure you're using GOOGLE_API_KEY
if (!apiKey) {
  console.error("Error: GOOGLE_API_KEY is not set in the .env file.");
  console.error("Please make sure your .env file has GOOGLE_API_KEY=YOUR_KEY_HERE");
  process.exit(1); // Exit if API key is missing
}
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model for non-streaming content generation
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/generate-text', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    // Use generateContent for non-streaming response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const text = response.text(); // Get the text from the response

    // Send a JSON response
    res.json({ text });

  } catch (error) {
    console.error('Error generating text:', error);
    // Send a JSON error response
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});