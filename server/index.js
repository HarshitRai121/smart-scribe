const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// A new, dedicated API endpoint for the frontend
app.get('/api/', (req, res) => {
  res.status(200).json({ message: 'Hello from the backend API!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});