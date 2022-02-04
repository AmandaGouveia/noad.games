const GAMEDIV = document.getElementById("game-container");
const GAMEPIECES = document.getElementsByClassName("game-piece");
const COLSIZE = 4;
let greedy = true;

let difficulty = 4;
let selected = -1;

let gameboard = [];

let solved = false;


function closeOptions(){
    let form = document.forms['options'];
    form.difficulty.value = difficulty-3;
    form.greedy.checked = greedy;

    document.getElementById("options-div").style.display = "none";
    document.getElementById("options-toggle").style.display = "flex";
}

function openOptions(){
    document.getElementById("options-toggle").style.display = "none";
    document.getElementById("options-div").style.display = "flex";
}

function clickCol(column) {
    if (!solved){
        if (selected > -1){
            document.getElementsByClassName("game-indicator-border")[selected].className.baseVal="game-indicator-border border-off";
            document.getElementsByClassName("game-indicator")[selected].className.baseVal="game-indicator off";
        }
        if (selected == -1 && gameboard[column][0]!=0){
            selected = column;
            document.getElementsByClassName("game-indicator-border")[selected].className.baseVal="game-indicator-border border-on";
            document.getElementsByClassName("game-indicator")[selected].className.baseVal="game-indicator on";
        }
        else {
            if (selected!=column && gameboard[column][3]===0 && gameboard[selected][0]>0){
                move(selected, column);
            } 
            selected = -1;
        }
    }
}

function isZero(n) {
    return n===0;
}

function setDifficulty(d){
    difficulty = d;
    setupGame();
}

function checkSolved(){
    let s = true;
    let i = 0;
    for (i=0; i<=difficulty;i++){
        let j = 0;
        for (j=1; j<COLSIZE; j++) {
            if (gameboard[i][0]!= gameboard[i][j]){
                s=false;
            }
        }
    }
    if (s){
        solved=true;
        document.getElementById("game-desc").textContent = "WINNER! Play again?";

        let gibs = document.getElementsByClassName("game-indicator-border");
        let gis = document.getElementsByClassName("game-indicator");
        let i = 0;
        for (i=0; i<=difficulty;i++) {
            gibs[i].className.baseVal="game-indicator-border border-won";
            gis[i].className.baseVal="game-indicator won";
        }
        document.getElementById("restart-btn").className = "game-btn restart-btn-won";
    }
    return s;
}

function move(fr, to){
    tc = gameboard[to].findIndex(isZero);
    fc = gameboard[fr].findIndex(isZero)-1;

    if(fc==-2) {fc = 3;}
    
    let n = gameboard[fr][fc];
    gameboard[to][tc] = n;
    gameboard[fr][fc] = 0;

    document.getElementsByClassName("game-piece")[to*COLSIZE + COLSIZE-1-tc].className.baseVal = `game-piece c${n}`;
    document.getElementsByClassName("game-piece")[fr*COLSIZE + COLSIZE-1-fc].className.baseVal = `game-piece c${0}`;
    if (greedy){
        let c = tc+1;
        let f = fc -1;
        while (c<COLSIZE && f>=0 && gameboard[fr][f]==n){
            gameboard[to][c] = n;
            gameboard[fr][f] = 0;

            document.getElementsByClassName("game-piece")[to*COLSIZE + COLSIZE-1-c].className.baseVal = `game-piece c${n}`;
            document.getElementsByClassName("game-piece")[fr*COLSIZE + COLSIZE-1-f].className.baseVal = `game-piece c${0}`;
            c++;
            f--;
        }
    }
    

    checkSolved();
}

function setupGame(){
    solved = false;

    let form = document.forms['options'];
    difficulty = parseInt(form.difficulty.value) + 3;
    greedy = form.greedy.checked;


    gameboard = [];
    let tempgame = [];
    let i = 0;
    for (i=0; i<=difficulty; i++){
        let j=0;
        for (j=0;j<COLSIZE;j++) {
            tempgame.push(i);
        }
    }
    tempgame = tempgame.sort(() => Math.random() - 0.5) // https://flaviocopes.com/how-to-shuffle-array-javascript/
    
    i = 0;
    let gamecontent = "";
    for (i=0; i<=difficulty; i++){
        let c = [];
        let t = i*COLSIZE;
        for (t=i*COLSIZE; t<(i+1)*COLSIZE;t++){
            if (tempgame[t]>0){
                c.push(tempgame[t]);
            }
        }
        while (c.length < COLSIZE){
            c.push(0);
        }
        gameboard.push(c)

        gamecontent += `
        <div class="game-col" id="game-col-${i}" onclick="clickCol(${i})">`
        let j = 0;
        for (j=COLSIZE-1;j>=0;j--){
            gamecontent += `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 10" class="eq-bar">
                <rect width="30" height="10" class="game-piece c${gameboard[i][j]}" rx="5"/>
            </svg>
            `
        }
        
        gamecontent += `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 10" class="game-indicator-container">
                <ellipse cx="15" cy="5" class="game-indicator-border border-off" rx="5" ry="5"/>
                <ellipse cx="15" cy="5" class="game-indicator off" rx="4.5" ry="4.5"/>
            </svg>
        </div>
        `;
    }
    GAMEDIV.innerHTML = gamecontent;
    document.getElementById("game-desc").textContent = "Click a column to select its top color and click another to move the color.";
    document.getElementById("restart-btn").className = "game-btn";
}

setupGame();