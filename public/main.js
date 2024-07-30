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
    const data = await response.json();

    // extract the list of games from the response
    // const allGames = data.applist.apps;
    const allGames = data.applist.apps.filter(
      (game) => game.name.trim() !== ""
    );

    // log the entire response in the console
    console.log(allGames);

    // Display the entire list of games in the 'game-list' div
    const gameListDiv = document.getElementById("game-title");
    gameListDiv.innerHTML = ""; // Clear any existing content

    const ul = document.createElement("ul"); // Create a new unordered list

    allGames.forEach((allGames) => {
      const li = document.createElement("li"); // Create a new list item
      li.innerText = allGames.name; // Set the text content to the game name
      ul.appendChild(li); // Append the list item to the unordered list
    });
    gameListDiv.appendChild(ul); // Append the unordered list to the 'game-list' div
  } catch (error) {
    console.error("Error fetching the games:", error); // Log any errors that occur
  }
});
