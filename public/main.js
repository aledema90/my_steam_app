// Add an event listener to the button with id 'get-game'
document.getElementById("get-game").addEventListener("click", async () => {
  try {
    // Fetch a random game from the backend
    const response = await fetch("/random-game");
    // Parse the response as JSON
    const game = await response.json();
    // Display the game title in the paragraph
    document.getElementById("game-title").innerText = game.name;
  } catch (error) {
    console.error("Error fetching the game:", error); // Log any errors that occur
  }
});

document.getElementById("get-all-games").addEventListener("click", async () => {
  try {
    // Fetch the response from the backend
    const response = await fetch("/games");
    // Parse the response as JSON
    const data = response.json();
    // log the entire response in the console
    console.log(data);
    // Display the game title in the paragraph
    document.getElementById("game-title").innerText = data;
  } catch (error) {
    console.error("Error fetching the game:", error); // Log any errors that occur
  }
});
