let players = [];
let displayText = document.querySelector(".infoDisplay");

let scoreCross = 0; // Move score variables outside of checkScore
let scoreCircle = 0; 

// Function to update the scoreboard
const updateScoreboard = () => {
    const displayContainer = document.querySelector("#roundDisplayContainer");
    displayContainer.innerHTML = ""; // Clear previous scores
    const displayRound = document.createElement("div");
    displayRound.classList.add("display-round"); 
    displayRound.textContent = `${players[0].name}: ${scoreCross} - ${players[1].name}: ${scoreCircle}`; // Update score display
    displayContainer.appendChild(displayRound);
};

/// IIFE 
const Gameboard = (() => {
    // my gameboard exist
    let gameboard = Array(9).fill(""); // to fill my array automatic

    // to show the gameboard
    const render = () => {
        const gameboardElement = document.querySelector("#gameboard");
        gameboardElement.innerHTML = ""; // Clear previous gameboard
        
        // loop to create div squares, add class and id index
            gameboard.forEach((index) => {
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
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
};


// IIFE
const Game = (() => {
    let turn = "cross";

    const start = () => {
        // event listener to the button
        document.querySelector("#start-button").addEventListener("click", () => {
            players = [
                createPlayer(document.querySelector("#player1").value, "cross"), // P1 gets cross
                createPlayer(document.querySelector("#player2").value, "circle") // P2 gets circle
            ];

            Gameboard.render(); // board is shown
            updateScoreboard(); 

            document.querySelector("#start-button").style.display = "none"; //hide button
        });
    };
    start();

    const nextRound = () => {
        document.getElementById("next-round-button").addEventListener("click", () => {
            console.log("Next round clicked");
            Gameboard.render(); // Render the gameboard for the next round
            displayText.textContent = "Tic Tac Toe"; // Reset display text for the next round
        });
    };
    nextRound();

    const restartGame = () => { 
        document.getElementById("restart-button").addEventListener("click", () => {
            console.log("restart clicked");
            const gameboardElement = document.querySelector("#gameboard"); // Define the element first
            gameboardElement.innerHTML = ""; // Clear the gameboard
            Gameboard.render();  // create board again
            scoreCross = 0; // Reset scores
            scoreCircle = 0; // Reset scores
            displayText.textContent = "Tic Tac Toe"; // Reset display text
            updateScoreboard();
            document.querySelector("#start-button").style.display = "block"; // Show the button again
        });
    };
    restartGame();
    
    const squareClick = (e) => {
        console.log("clicked", e); // log which div is clicked(for fun)

        const turnDisplay = document.createElement("div"); // create a div 
        turnDisplay.classList.add(turn); // that div has a class of firstTurn = circle = css styling for .circle
        e.target.append(turnDisplay); // append this circle on div to my target ( square.div )
       
        // alternate circle and cross        
        turn = turn === "cross" ? "circle" : "cross";
        // connect turn with player
        const currentPlayer = turn === "cross" ? players[0] : players[1];
        // display players name turn
        displayText.textContent = "It's now " + currentPlayer.name + "'s turn";

        checkScore(players);
        e.target.removeEventListener("click", squareClick);
    };

    return {
        squareClick,
    };
})();

function checkScore(players) {
    const allSquares = document.querySelectorAll(".square");
    let crossWins = false; 
    let circleWins = false; 

    const winningCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombination.forEach(array => {
        crossWins = array.every(squareDiv => {
            const hasCross = allSquares[squareDiv].firstChild?.classList.contains("cross");
            return hasCross;
        });

        if (crossWins) {
            displayText.textContent = players[0].name + " wins!";
            console.log("Cross wins detected!");
            allSquares.forEach(square => square.removeEventListener("click", Game.squareClick));
            scoreCross++; // Increment score
            updateScoreboard(); // Update scoreboard
            return; 
        }

        circleWins = array.every(squareDiv => {
            const hasCircle = allSquares[squareDiv].firstChild?.classList.contains("circle");
            return hasCircle;
        });

        if (circleWins) {
            displayText.textContent = players[1].name + " wins!";
            console.log("Circle wins detected!");
            allSquares.forEach(square => square.removeEventListener("click", Game.squareClick));
            scoreCircle++; // Increment score
            updateScoreboard(); // Update scoreboard
            return; 
        }
        
        // Check for a tie if no one has won
        if (!crossWins && !circleWins && [...allSquares].every(square => square.firstChild)) {
            displayText.textContent = "It's a tie!";
            console.log("The game ended in a tie!");
            allSquares.forEach(square => square.removeEventListener("click", Game.squareClick));
        }
    });
}
