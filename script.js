let players = [];
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

            checkScore(players);

        });
    };

    start();

    const squareClick = (e) => {

        console.log("clicked", e);                          //log which div is clicked(for fun)

        const turnDisplay = document.createElement("div");  //create a div 
        turnDisplay.classList.add(turn);                     //that div has a class of firstTurn = circle = css styling for .circle
        e.target.append(turnDisplay);                        // apend this circle on div to my target ( square.div )
       

        //alternate circle and cross        
        turn = turn === "cross" ? "circle" : "cross";

        let displayText = document.querySelector(".infoDisplay");
        //connect turn with player
        const currentPlayer = turn ==="cross" ? players[0] : players[1];
        //display players name turn
        displayText.textContent = "Its now " + currentPlayer.name + "'s turn";


       e.target.removeEventListener("click", squareClick) // cant click again
    };

    return {
        squareClick,
    };

})();// calling fx

function checkScore(players) {
    const allSquares = document.querySelectorAll(".square");
    const winningCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombination.forEach(array => {

        const crossWins = array.every(squareDiv => {
            const hasCross = allSquares[squareDiv].firstChild?.classList.contains("cross");
         
            return hasCross;
        });

        if (crossWins) {
            displayText.textContent = players[0].name + " wins";
            console.log("Cross wins detected!");
            return; // Exit the loop if a win is found
        }

        const circleWins = array.every(squareDiv => {
            const hasCircle = allSquares[squareDiv].firstChild?.classList.contains("circle");
           
            return hasCircle;
        });

        if (circleWins) {
            displayText.textContent = players[1].name + " wins";
            console.log("Circle wins detected!");
            return; // Exit the loop if a win is found
        }
    });
}







 



// start the game fx 
    //connect players names to 0 or X (inheritance with factory) DONE
    //clicked button event start  DONE
    // when clicked any square, O or X is marked DONE
  
    //click
    // add event listener (click) to squares DONE
//if clicked display circle or ex. (if function here) DONE


        // game handling
    // alternate 0 and X for easier handle each click DONE
    //each square has a number to be identified ( selector index) DONE

    //function to compare numbers and wins / looses (module?)
    //function winner (if fx)
    //fx rounds ( ++ winner player)

        //display score
    // score update/ displayed ++



