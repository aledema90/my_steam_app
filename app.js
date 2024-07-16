// Import the necessary modules

import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
//const express = require("express"); // Import Express framework
// const fetch = require("node-fetch"); // Import node-fetch for making HTTP requests
// const dotenv = require("dotenv"); // Import dotenv for loading environment variables

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of Express
const port = 3000; // Define the port on which the server will run
const STEAM_API_KEY = process.env.STEAM_API_KEY; // Get the Steam API key from environment variables

app.use(express.static("public")); // Serve static files from the 'public' directory

// Define an endpoint to get a random game
app.get("/random-game", async (req, res) => {
  try {
    // Fetch the list of all games from Steam API
    const response = await fetch(
      `https://api.steampowered.com/ISteamApps/GetAppList/v2/`
    );
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
