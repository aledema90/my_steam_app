// Import the necessary modules

import express from "express"; // Import Express framework
import fetch from "node-fetch"; // Import node-fetch for making HTTP requests
import { steamLink } from "./config.js"; // Import variables from config file

const app = express(); // Create an instance of Express
const port = process.env.PORT || 3000; // Define the port on which the server will run or use the PORT environment variable if available
const STEAM_API_KEY = process.env.STEAM_API_KEY; // Get the Steam API key from environment variables

app.use(express.static("public")); // Serve static files from the 'public' directory

// Helper function to fetch game details
async function getGameDetails(appId) {
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us`
    );
    const data = await response.json();
    return data[appId].data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
}

// Define an endpoint to get all games
app.get("/games", async (req, res) => {
  try {
    // Fetch the list of all games from Steam API
    const response = await fetch(steamLink);
    const data = await response.json(); // Parse the response as JSON
    res.json(data); // Send the random game as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game list" }); // Handle errors by sending a 500 status
  }
});

// Define an endpoint to get a random game with details
app.get("/random-game", async (req, res) => {
  try {
    // Fetch the list of all games
    const response = await fetch(steamLink);
    const data = await response.json();
    const games = data.applist.apps;

    // Keep trying until we find a game with details
    let gameDetails = null;
    let attempts = 0;
    const maxAttempts = 5;

    while (!gameDetails && attempts < maxAttempts) {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      gameDetails = await getGameDetails(randomGame.appid);
      attempts++;
    }

    if (!gameDetails) {
      throw new Error(
        "Could not find a game with details after multiple attempts"
      );
    }

    res.json({
      appid: gameDetails.steam_appid,
      name: gameDetails.name,
      header_image: gameDetails.header_image,
      short_description: gameDetails.short_description,
      price: gameDetails.is_free
        ? "Free to Play"
        : gameDetails.price_overview
        ? `$${(gameDetails.price_overview.final / 100).toFixed(2)}`
        : "Price not available",
      categories: gameDetails.categories?.map((cat) => cat.description) || [],
      genres: gameDetails.genres?.map((genre) => genre.description) || [],
      release_date:
        gameDetails.release_date?.date || "Release date not available",
    });
  } catch (error) {
    console.error("Error in random-game endpoint:", error);
    res.status(500).json({ error: "Failed to fetch game details" });
  }
});

//Get the details of a single game

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message when the server starts
});
