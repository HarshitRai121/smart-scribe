# Smart Scribe: AI-Powered Writing Assistant ✍️

Smart Scribe is a full-stack web application that helps you write better and faster using AI. The application features a rich-text editor with a minimalist design, a collapsible sidebar for AI-powered actions, and robust document management tools.

![smart-scribe Preview 1](./client/public/pic1.png)

![smart-scribe Preview 2](./client/public/pic2.png)


## Features

* **AI-Powered Actions:** Seamlessly integrate AI to summarize, continue, improve, or rewrite your text.
* **Rich-Text Editor:** A powerful, minimalist editor built with the Lexical framework, offering standard formatting options (bold, italic, underline, lists).
* **Responsive & Intuitive UI:** A professional, narrow, and collapsible sidebar that provides a clean user interface on both desktop and mobile.
* **Document Management:** Save, load, and export your documents as either plain text (.txt) or Markdown (.md) files.
* **Dark Mode:** A toggle for a comfortable dark mode writing experience.

## Technologies Used

### Frontend

* React: A JavaScript library for building the user interface.
* Lexical: A powerful and extensible rich-text editor framework.
* Tailwind CSS: A utility-first CSS framework for rapid UI development.
* React Icons: A library for including icons in the project.

### Backend

* Node.js: A JavaScript runtime for the server-side API.
* Express.js: A web framework for building the RESTful API.
* Google's Gemini API: The AI model used for text generation and processing.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (v18 or higher)
* npm (v9 or higher)

### 1. Clone the repository

```bash
git clone https://github.com/HarshitRai121/smart-scribe.git
cd smart-scribe
```

### 2. Install dependencies

Install the dependencies for both the client and server.

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Configure the AI API Key

Create a `.env` file inside your `server` directory to store your Google Gemini API key.  **Remember to replace `your_google_gemini_api_key_here` with your actual API key.**  **Do not commit this file to version control.**

```bash
API_KEY=your_google_gemini_api_key_here
```

### 4. Run the application

Start the backend server and the frontend development server.

```bash
# Start the backend server
cd server
npm start

# In a new terminal, start the frontend development server
cd ../client
npm start
```

Your application should now be running at `http://localhost:5173`.

## Deployment

This application is configured for deployment on Vercel. The `vercel.json` file in the root directory handles the routing for both the React frontend and the Node.js API.

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Import the project into your Vercel dashboard.
3. Add your `API_KEY` as an environment variable in your Vercel project settings.
4. Deploy the project. Vercel will handle the rest!

