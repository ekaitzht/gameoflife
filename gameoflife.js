/* 
I have used jQuery because I am not and expert with pure javascript using the dom.
I know that I haven't used the best pratices about clean code and patterns but I
was focus to deliver the result.

The main function is the bottom of the file in the ready call.


*/




var grid = [];
// I know this not good pratice and is harcoded but I didn't have time to modify
var width = 30;
var height = 29;
var nextGrid = [];





function createGrid() {

    var e = document.getElementById("canvas-grid"); // whatever you want to append the rows to: 

    for (var i = 0; i < width; i++) {
        var columns = [];
        var columnsNextGrid = [];
        var row = document.createElement("div");
        row.className = "row";
        for (var x = 0; x <= height; x++) {
            var cell = document.createElement("div");
            cell.className = "gridsquare-" + i + "-" + x;
            cell.innerText = Math.round(Math.random());
            columns[x] = cell.innerText;
            columnsNextGrid[x] = "0"
            row.appendChild(cell);
        }
        grid[i] = columns;
        nextGrid[i] = columnsNextGrid;
        e.appendChild(row);
    }
}

function isOutofGrid(elem) {
    if (elem.row < 0 || elem.row > 29) {
        return true;
    } else if (elem.column < 0 || elem.column > 29) {
        return true;
    } else {
        return false;
    }
}

function isAliveNeighbour(i, j) {
    //console.log("i-> "+i+"j-> "+j)
    return Boolean(parseInt(grid[i][j]));
}

function countNeighbours(i, j) {

	//neighbours
    var first = {row:j-1,column:i-1}
	var second = {row:j-1,column:i}
	var third = {row:j-1,column:i+1}
	var fourth = {row:j+1,column:i}
	var fifth = {row:j+1,column:i+1}
	var sixth = {row:j,column:i+1}
	var seventh = {row:j+1,column:i-1}
	var eigth = {row:j,column:i-1}

    var neighbours = [first, second, third, fourth, fifth, sixth, seventh, eigth]
    var aliveNeighbours = 0;
    neighbours.forEach(function(elem) {
        if (!isOutofGrid(elem)) {
            if (isAliveNeighbour(elem.column, elem.row)) {
                aliveNeighbours += 1;


            }

        }
    })

    return aliveNeighbours;

}


var nextGeneration = function() {
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
        	liveNeighbours = countNeighbours(i, j)
        	isAlive = isAliveNeighbour(i, j)
            if (isAlive) {
                
                //Underpopulation or overpopulation
                if (liveNeighbours < 2 || liveNeighbours > 3) {
                    nextGrid[i][j] = "0"
                } else { // if is 2 or three continues to live
 					nextGrid[i][j] = "1"
                }
        

            } else if (countNeighbours(i, j) === 3) {
                    nextGrid[i][j] = "1"
            }
        }
    }

    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            $(".gridsquare-" + i + "-" + j).text(nextGrid[i][j])

            grid[i][j] = nextGrid[i][j];
        }
    }


}

$(document).ready(function() {
    let i = 0;
    let j = 0;
    let interval = null
    createGrid();

    $('#next-generation').click(nextGeneration);
    $('#run').click(function() {

        interval = setInterval(nextGeneration, 500);
    });

    $('#stop').click(function() {

        clearInterval(interval);
    })
});