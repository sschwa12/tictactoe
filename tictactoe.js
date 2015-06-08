var game = function() {

    // Private vars / functions
    var turnCount = 1;
    var winner;
    var gameOver = false;

    var checkForGameOver = function() {
        if (gameOver === true) {
            console.log("Your game is complete. Please use ticTacToe.startNewGame(); to begin again.");
            return;
        }
    }

    // Utility function to check equality of array values
    var isEqual = function(arr) {
        return arr.reduce(function(a, b) {
            // Check for empty placements
            if (a === ' ') {
                return false;
            } else {
                // Set winner
                winner = arr[0];
                // Set to false if equal
                return (a === b) ? a:false;
            }
            // Compare with first item in arr
        }) === arr[0];
    }

    var testInput = function(position, letter) {
        // If it's an invalid number
        if (position > 8) {
            console.log('Please enter a number between 1 and 8');
            return;
        // If it's already taken
        } else if (placement[position] !== ' ') {
            console.log('That spot is taken!');
            return;
        }
        // Accept upper and lower case
        if (letter === 'x' || letter === 'X') {
            placement[position] = 'X';
        } else if (letter === 'o' || letter === 'O') {
            placement[position] = 'O';
        // Handle unexpected inputs
        } else {
            console.log('Please enter a valid letter! (X or O)');
        }
    }

    var findWinner = function() {
        if (

                // Check rows
                isEqual([placement[0], placement[1], placement[2]]) ||
                isEqual([placement[3], placement[4], placement[5]]) ||
                isEqual([placement[6], placement[7], placement[8]]) ||

                // Check columns
                isEqual([placement[0], placement[3], placement[6]]) ||
                isEqual([placement[1], placement[4], placement[7]]) ||
                isEqual([placement[2], placement[5], placement[8]]) ||

                // Check diagonals
                isEqual([placement[0], placement[4], placement[8]]) ||
                isEqual([placement[2], placement[4], placement[6]])

            ) {
                return true;
            }
        }

    // Public methods
    return {

        drawBoard : function(firstRun) {
            // Demonstrate position #s to user
            if (firstRun) {
                placement = [0,1,2,3,4,5,6,7,8];
                // Such Console. Very Log. Wow.
                console.log('***************************');
                console.log('* Welcome to Tic Tac Toe! *');
                console.log('***************************');
                console.log('');
                console.log('Available methods are: \n \n');
                console.log('ticTacToe.place(position, letter)');
                console.log('   - Places a letter (use X or O) in the supplied position. Must be a string. \n');
                console.log('ticTacToe.drawBoard() \n');
                console.log('   - Displays the current board \n');
                console.log('ticTacToe.startNewGame() \n');
                console.log('   - Starts a new game \n \n');
                console.log('Board Positions: \n');
            }
            // Build the board!
            var row1 = placement[0] +' | '+placement[1]+ ' | ' + placement[2] + '\n';
            var row2 = placement[3] +' | '+placement[4]+ ' | ' + placement[5] + '\n';
            var row3 = placement[6] +' | '+placement[7]+ ' | ' + placement[8] + '\n';
            var structureRow = '--|---|--' + '\n';
            console.log(row1);
            console.log(structureRow);
            console.log(row2);
            console.log(structureRow);
            console.log(row3);
            // Start with blank board
            if (firstRun) {
                placement = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            }
        },

        place : function(position, letter) {
            // Check if game is over
            if (gameOver === true) {
                checkForGameOver();
                return;
            }
            // Check for valid user input
            testInput(position, letter);
            // Increment turn counter
            turnCount++;
            // Check for winner
            if (findWinner()) {
                this.drawBoard();
                console.log('********** GAME OVER! **********');
                console.log('********** The ' + winner + '\'s ************* Have Won!');
                gameOver = true;
            } else if (turnCount > 9) {
                console.log('********** GAME OVER! **********');
                console.log('********** Stalemate! **********');
            } else {
            // Draw board, proceed to next turn
                this.drawBoard();
            }
        },

        startNewGame : function() {
            // Reset vars and draw new board
            placement = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            turnCount = 1;
            gameOver = false;
            this.drawBoard(true);
        },
    }
}

var ticTacToe = game();

// Start the game!
ticTacToe.drawBoard(true);