// Add an event listener to the button with id 'get-game'
document.getElementById("get-game").addEventListener("click", async () => {
  try {
    // Fetch a random game from the backend
    const response = await fetch("/random-game");
    const game = await response.json(); // Parse the response as JSON
    console.log(game);
    document.getElementById("game-title").innerText = game.name; // Display the game title in the paragraph
  } catch (error) {
    console.error("Error fetching the game:", error); // Log any errors that occur
  }
});
