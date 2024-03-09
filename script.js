console.log("Jitenderchauhan2020@outlook.com");
//These all fething from html document
let gameInfo = document.querySelector(".game-info");
let newBtn = document.querySelector(".btn");
let boxes = document.querySelectorAll(".box");

let currentPlayer;
let gameGrid = ["","","","","","","","",""];

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function init(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
    boxes.forEach((Element,index)=>{
        Element.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
        // boxes.classList = `box box${index+1}`;
    })


    newBtn.classList.remove("active");
}
init();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}



function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newBtn.classList.add("active");
    }

}

function handleClick(Element, index){
    console.log(gameGrid[index]);
    if(gameGrid[index] === ""){
        Element.innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        Element.style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}


boxes.forEach((Element, index)=>{
    Element.addEventListener("click", ()=>{
        handleClick(Element, index);
    });
});

newBtn.addEventListener("click", init);

