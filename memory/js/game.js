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
let timer = 0;

let showingCards = false;
let secondCard = -1;

let debug = false;

function hideCard(n){
    document.getElementById(`game-btn-${n}`).innerHTML = "";
    document.getElementById(`game-btn-${n}`).className = "memory-btn card-hidden";
}

function timeOutFromClick(){
    if(debug){console.log("timeout")}
    clearTimeout(timer);
    if (showingCards){
        if (gameIcons[secondCard] === gameIcons[selected]){
            solved[secondCard] = true;
            solved[selected] = true;
            document.getElementById(`game-btn-${secondCard}`).className = "memory-btn card-solved";
            document.getElementById(`game-btn-${selected}`).className = "memory-btn card-solved";
            if (isWon()){
                let content = `
                <h2 class="span-${numCards}">You Win!</h2>
                <button onclick="startGame()" class="playagain btn-span-${numCards}">Play Again</button>
                `
                document.getElementById("game-container").innerHTML = content;
            }
            
        } else {
            hideCard(secondCard);
            hideCard(selected);
        }

        selected = -1;
        showingCards = false;
    }
}

function cardClick(n){
    clearTimeout(timer);
    if(debug){console.log(`click ${n} selected ${selected} second ${secondCard}`)}
    if (showingCards){
        if (gameIcons[secondCard] === gameIcons[selected]){
            solved[secondCard] = true;
            solved[selected] = true;
            document.getElementById(`game-btn-${secondCard}`).className = "memory-btn card-solved";
            document.getElementById(`game-btn-${selected}`).className = "memory-btn card-solved";
            if (isWon()){
                let content = `
                <h2 class="span-${numCards}">You Win!</h2>
                <button onclick="startGame()" class="playagain btn-span-${numCards}">Play Again</button>
                `
                document.getElementById("game-container").innerHTML = content;
            }
            
        } else {
            hideCard(secondCard);
            hideCard(selected);
        }

        selected = -1;
        showingCards = false;
    }
    if (solved[n]===false){
        if (selected == n){
            hideCard(selected);
            selected = -1;
        } else {
            if(selected>=0){
                document.getElementById(`game-btn-${n}`).className = "memory-btn card-shown";
                document.getElementById(`game-btn-${n}`).innerHTML = `<i class="fas fa-${gameIcons[n]}"></i>`;
                showingCards = true;
                secondCard = n;
                timer = setTimeout(function() { clearTimeout(timer); timeOutFromClick();}, 3000);
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
    timer = clearTimeout()
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



