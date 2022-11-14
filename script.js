const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const GIFS = getGifs();

function getGifs() {
  let items = [];
  numCards = 12;
  for (let i = 1; i <= 12; ++i) {
    items.push(`gifs/${i}.gif`);
    items.push(`gifs/${i}.gif`);
  }
  return items;
}
console.log("ff");
const game = document.querySelector("#game");
const spnBestScore = document.querySelector("#bestScore");
const btnPlayGame = document.querySelector("button");
const divScores = document.querySelector("#divScores");
const h1Over = document.querySelector("#h1Over");

let score, clicks, numMatched, cards, bestScore;

btnPlayGame.addEventListener("click", function () {
  console.log("hhh");
  game.innerHTML = "";
  //shuffledColors = shuffle(COLORS);
  //createDivsForColors(shuffledColors);
  shuffledImages = shuffle(GIFS);
  createDivsForGifs(shuffledImages);
  score = 0;
  clicks = 0;
  numMatched = 0;
  cards = [];
  bestScore =
    localStorage.score === undefined || localStorage.score === ""
      ? 0
      : parseInt(localStorage.score);
  spnBestScore.innerText = bestScore;
  game.className = "";
  btnPlayGame.className = "hideGame";
  divScores.className = "";
  h1Over.className = "hideGame";
});

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function createDivsForGifs(arr) {
  for (let src of arr) {
    // create a new div
    const newDiv = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("class", "hideGame");
    newDiv.append(img);

    // give it a class attribute for the value we are looping over
    //newDiv.classList.add(color);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// listerner to change color
game.addEventListener("click", function (e) {
  if (e.target.tagName === "DIV") {
    if (e.target.style.backgroundColor === "") {
      ++clicks;
      if (clicks <= 2) {
        //check that card hasnt been chosen before
        let curImg = e.target.querySelector("img");
        curImg.className = "";
        cards.push(e.target);
        if (clicks === 2) {
          let img1 = cards[0].querySelector("img");
          let img2 = cards[1].querySelector("img");
          console.log(img2.getAttribute("src"));
          if (img1.getAttribute("src") === img2.getAttribute("src")) {
            ++numMatched;
            clicks = 0;
            cards = [];
            if (numMatched === GIFS.length / 2) {
              gameOver();
            }
          } else {
            setTimeout(flipCards, 1000);
          }
        }
      }
    }
  }
});

//if no matches
function flipCards() {
  ++score;
  for (let card of cards) {
    let curImg = card.querySelector("img");
    curImg.className = "hideGame";
  }
  clicks = 0;
  cards = [];
  const spnScore = document.querySelector("#score");
  spnScore.innerText = score;
}

function gameOver() {
  if (bestScore === 0 || score < bestScore) {
    localStorage.setItem("score", score);
  }
  game.className = "hideGame";
  btnPlayGame.className = "";
  btnPlayGame.innerText = "Play Again";
  divScores.className = "";
  h1Over.className = "";
}
