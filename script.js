// Memory Game: Main Script
const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

// Card data (pairs of values)
const cardValues = ["🐶", "🐱", "🦊", "🐻", "🦄", "🐼", "🐸", "🦁"];
let cards = [...cardValues, ...cardValues]; // Duplicate for pairs

// Shuffle function using ES6 array methods
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Recursively flip all cards back after a short delay
const flipBackCards = (flippedCards) => {
  if (flippedCards.length === 0) return;
  const card = flippedCards.pop();
  card.innerHTML = "";
  card.classList.remove("flipped");
  flipBackCards(flippedCards);
};

// Check for matching pairs
let flippedCards = [];
let matchedPairs = 0;

const checkMatch = () => {
  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      flippedCards = [];
      matchedPairs++;
      if (matchedPairs === cardValues.length) {
        message.textContent = "🎉 You Win! 🎉";
      }
    } else {
      setTimeout(() => flipBackCards(flippedCards), 1000); // Recursive flip back
    }
  }
};

// Initialize game board
const createGameBoard = () => {
  shuffleArray(cards);
  cards.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;

    // Click event for card flipping
    card.addEventListener("click", () => {
      if (flippedCards.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
        card.innerHTML = value; // Show card value
        card.classList.add("flipped");
        flippedCards.push(card);

        // Animate the flip
        anime({
          targets: card,
          rotateY: 360,
          duration: 500,
        });

        checkMatch();
      }
    });

    gameBoard.appendChild(card);
  });
};

// Initialize the game
createGameBoard();
