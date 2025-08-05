const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load API key from .env file
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  throw new Error('GOOGLE_API_KEY is not set in the .env file');
}

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Middleware
app.use(express.json());
app.use(cors());

// A new, dedicated API endpoint for the frontend AI requests
app.post('/api/generate-text', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // For this step, we will just log the prompt to the console.
    // In the next step, we will add the code to call the AI.
    console.log(`Received prompt: ${prompt}`);

    res.status(200).json({ generatedText: 'This is a placeholder for AI-generated text.' });

  } catch (error) {
    console.error('Error in AI endpoint:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});