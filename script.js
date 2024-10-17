/// IIFE 
const Gameboard = (() => {
    // my gameboard exist
    let gameboard = Array(9).fill(""); // to fill my array automatic

        // to show the gameboard
        const render = () => {
            const gameboardElement = document.querySelector("#gameboard");
        
        // loop to create div squares, add class and id index
            gameboard.forEach((square, index) => { // am iusing square?
             const squareDiv = document.createElement("div");
             squareDiv.className = "square";
             squareDiv.id = `square-${index}`;
             squareDiv.addEventListener("click", Game.squareClick);
             gameboardElement.appendChild(squareDiv); // Append the new div to the gameboard
        });
    }

    return {
        render,
    }
})();


// factory players /constructor
const createPlayer = (name,mark) =>{
    return {
        name,
        mark
    };
};


//IIFE
const Game = (() => {
    let players = [];
    // let gameOver;
    let turn = "cross";

    const start = () => {
        //event listener to the button
        document.querySelector("#start-button").addEventListener("click", () => {
           
            players = [
                createPlayer(document.querySelector("#player1").value, "cross"), // P1 gets cross
                createPlayer(document.querySelector("#player2").value, "circle") // P2 gets circle
            ];

            Gameboard.render(); //board its shown

            // console.log(`Player 1: ${players[0].name} with mark: ${players[0].mark}, Player 2: ${players[1].name} with mark: ${players[1].mark}`);
        });
    };

    start();

    const squareClick = (e) => {

        console.log("clicked", e);                          //log which div is clicked(for fun)

        const turnDisplay = document.createElement ("div")  //create a div 
        turnDisplay.classList.add(turn)                     //that div has a class of firstTurn = circle = css styling for .circle
        e.target.append(turnDisplay)                        // apend this circle on div to my target ( square.div )
       
        //alternate circle and cross        
        turn = turn === "cross" ? "circle" : "cross"

        let displayText = document.querySelector(".infoDisplay");
        //connect turn with player
        const currentPlayer = turn ==="cross" ? players[0] : players[1];
        //display players name turn
        displayText.textContent = "Its now " + currentPlayer.name + " turn's";


       e.target.removeEventListener("click", squareClick) // cant click again
    };

    return {
        squareClick,
    };

})();// calling fx






 



// start the game fx 
    //connect players names to 0 or X (inheritance with factory) DONE
    //clicked button event start  DONE
    // when clicked any square, O or X is marked
  
    //click
    // add event listener (click) to squares DONE
// take the index value of each square and check if clicked
//if clicked display circle or ex. (if function here)
// does this need to be inside Game? or outside? 

        // game handling
    // alternate 0 and X for easier handle each click
    //each square has a number to be identified ( selector index)
    //function to compare numbers and wins / looses (module?)
    //function winner (if fx)
    //fx rounds ( ++ winner player)

        //display score
    // score update/ displayed ++



