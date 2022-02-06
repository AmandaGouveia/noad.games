let icons = [
    "cat", "cat",
    "dog", "dog",
    "paw", "paw",
    "horse", "horse",
    "spider", "spider",
    "fish", "fish",
    "frog", "frog",
    "crow", "crow"
];
let numCards = 16;
let selected = -1;

let gameIcons = [];
let solved = [];

let showingCards = false;
let secondCard = -1;

function hideCard(n){
    document.getElementById(`game-btn-${n}`).innerHTML = "";
    document.getElementById(`game-btn-${n}`).className = "memory-btn card-hidden";
}

function cardClick(n){
    if (showingCards){
        if (gameIcons[secondCard] === gameIcons[selected]){
            solved[secondCard] = true;
            solved[selected] = true;
            document.getElementById(`game-btn-${secondCard}`).className = "memory-btn card-solved";
            document.getElementById(`game-btn-${selected}`).className = "memory-btn card-solved";
            if (isWon()){
                console.log("You Win!");
            }
            
        } else {
            hideCard(secondCard);
            hideCard(selected);
        }

        selected = -1;
        showingCards = false;
    } else if (solved[n]===false){
        if (selected == n){
            hideCard(selected);
            selected = -1;
        } else {
            if(selected>=0){
                document.getElementById(`game-btn-${n}`).className = "memory-btn card-shown";
                document.getElementById(`game-btn-${n}`).innerHTML = `<i class="fas fa-${gameIcons[n]}"></i>`;
                showingCards = true;
                secondCard = n;
            }
            else {
                selected = n;
                document.getElementById(`game-btn-${selected}`).className = "memory-btn card-shown";
                document.getElementById(`game-btn-${selected}`).innerHTML = `<i class="fas fa-${gameIcons[selected]}"></i>`;
            }
        }
    }
    
    document.activeElement.blur()
}

function isWon() {
    let i = 0;
    for (i=0; i<numCards;i++){
        if (solved[i] === false){
            return false;
        }
    }
    return true;
}

function startGame(){
    gameIcons = icons.sort(() => Math.random() - 0.5);
    solved = [];
    for (let i = 0; i < numCards; i++) {
        solved.push(false);
    }
    let gameContainer = document.getElementById("game-container");
    gameContainer.className = `cards-${numCards}`
    let initialCards = "";
    for (let i = 0; i < numCards; i++) {
        initialCards+=`<button id="game-btn-${i}" class="memory-btn card-hidden" onclick="cardClick(${i})"></button>`
    }
    gameContainer.innerHTML = initialCards;

}


startGame();



