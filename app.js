// Import the necessary modules

import express from "express"; // Import Express framework
import dotenv from "dotenv"; // Import dotenv for loading environment variables
import fetch from "node-fetch"; // Import node-fetch for making HTTP requests
import { steam_link } from "./config.js";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of Express
const port = process.env.PORT || 3000; // Define the port on which the server will run or use the PORT environment variable if available
const STEAM_API_KEY = process.env.STEAM_API_KEY; // Get the Steam API key from environment variables

app.use(express.static("public")); // Serve static files from the 'public' directory

// Define an endpoint to get a random game
app.get("/random-game", async (req, res) => {
  try {
    // Fetch the list of all games from Steam API
    const response = await fetch(steam_link);
    const data = await response.json(); // Parse the response as JSON
    const games = data.applist.apps; // Get the list of games from the response
    const randomGame = games[Math.floor(Math.random() * games.length)]; // Select a random game
    res.json(randomGame); // Send the random game as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game list" }); // Handle errors by sending a 500 status
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message when the server starts
});
