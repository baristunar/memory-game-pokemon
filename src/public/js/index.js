import { cards } from "./cards.js";


document.addEventListener("DOMContentLoaded", () => {

  const gameBoardDisplay = document.querySelector(".game-board");
  const alertMessageDisplay = document.querySelector(".alert-message");
  const scoreDisplay = document.querySelector(".score");
  const pokeballImage = "assets/pokeball.png";

  let chosenCards = [];
  let chosenCardIds = [];
  let matchedCards = [];

  shuffleArray();

  function createBoard() {
    cards.forEach((card, index) => {
      gameBoardDisplay.innerHTML += `<img class="game-card" data-id="${index}" src="${pokeballImage}" />`;
    });

    bindCardsClickEvent();
  }

  function shuffleArray() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  function bindCardsClickEvent() {
    const cards = document.querySelectorAll(".game-card");

    cards.forEach((card) => {
      card.addEventListener("click", flipCard);
    });
  }

  function flipCard() {
    const cardId = this.getAttribute("data-id");
    this.src = cards[cardId].image;
    chosenCards.push(cards[cardId].name);
    chosenCardIds.push(cardId);

    if (chosenCards.length === 2) {
      setTimeout(checkForMatch, 300);
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".game-card");
    const [cardOneId, cardTwoId] = chosenCardIds;

    if (cardOneId === cardTwoId) {
      alertMessageDisplay.textContent = "You selected same card!";
      setTimeout(() => {
        alertMessageDisplay.textContent = "";
      }, 3000);
      cards[cardOneId].src = pokeballImage;
      cards[cardTwoId].src = pokeballImage;
    } else if (chosenCards[0] === chosenCards[1]) {
      alertMessageDisplay.textContent = "Congratulations! You found one match!";
      setTimeout(() => {
        alertMessageDisplay.textContent = "";
      }, 3000);
      matchedCards.push(chosenCards);
      scoreDisplay.textContent = matchedCards.length;
      cards[cardOneId].style = "visibility:hidden;";
      cards[cardTwoId].style = "visibility:hidden;";
      cards[cardOneId].removeEventListener("click", flipCard);
      cards[cardTwoId].removeEventListener("click", flipCard);
    } else {
      cards[cardOneId].src = pokeballImage;
      cards[cardTwoId].src = pokeballImage;
    }
    checkGameFinish();
    chosenCardIds = [];
    chosenCards = [];
  }

  function checkGameFinish() {
    if (matchedCards.length === cards.length / 2) {
      const restartButton = document.querySelector(".restart-btn");
      const cards = document.querySelectorAll(".game-card");

      cards.forEach((element) => element.remove());
      restartButton.classList.remove("hidden");
      restartButton.addEventListener("click", restartGame);
    }
  }

  function restartGame() {
    const restartButton = document.querySelector(".restart-btn");
    restartButton.classList.add("hidden");
    shuffleArray();
    createBoard();
    matchedCards = [];
    scoreDisplay.textContent = 0;
  }
  createBoard();
});
