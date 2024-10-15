/// IIFE 
const Gameboard = (() => {
    // my gameboard exist
    let gameboard = Array(9).fill(""); // to fill my array automatic

        // to show the gameboard
        const render = () => {
            const gameboardElement = document.querySelector("#gameboard");
        
        // loop to create div squares, add class and id index
            gameboard.forEach((square, index) => {
             const squareDiv = document.createElement("div");
             squareDiv.className = "square";
             squareDiv.id = `square-${index}`;
             gameboardElement.appendChild(squareDiv); // Append the new div to the gameboard
        });
    }

    return {
        render,
    }
})();

// factory players
const createPlayer = (name,nati) =>{
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1"). value, "x"),
            createPlayer(document.querySelector("#player2"). value, "o")
        ]
        return{
            start
        }
        console.log ("players added")
    }

})();// calling fx



Gameboard.render();
// start the game fx 
    //connect players names to 0 or X (inheritance with factory)
    //clicked button event start
    // when clicked any square, O or X is marked

        // game handling
    // alternate 0 and X for easier handle each click
    //each square has a number to be identified ( selector index)
    //function to compare numbers and wins / looses (module?)
    //function winner (if fx)
    //fx rounds ( ++ winner player)

        //display score
    // score update/ displayed ++



