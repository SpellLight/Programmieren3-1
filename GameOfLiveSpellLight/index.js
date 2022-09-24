
const socket = io();
const clearButton = document.getElementById('clear');
const randMatrixButton = document.getElementById("randMatrix");

let side = 10;
let isRaining = false;

socket.on("first send matrix", function(data){
    createCanvas(data[0].length * side, data.length * side + 1);
    drawMatrix(data);
})

socket.on('send rain', function(data){
    isRaining = data;
});

socket.on('send matrix', function(data){
    drawMatrix(data);
});

function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side + 1)
    background("#acacac")

}

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 0:
                    fill("gray");
                    break;
                case 1:
                    //Grass
                    fill(51, 102, 0);
                    if (isRaining){
                        fill(44, 88, 0);
                    }
                    break;
                case 2:
                    //GrassFresser
                    fill("yellow");
                    if (isRaining){
                        fill(199, 199, 0);
                    }
                    break;
                case 3:
                    //FleischFresser
                    fill("red");
                    if (isRaining){
                        fill(182, 0, 0);
                    }
                    break;
                case 4:
                    fill("orange");
                    break;
                case 5:
                    // mutated Grass
                    fill(102, 203, 0);
                    if (isRaining){
                        fill(97, 193, 0);
                    }
                    break;
                default:
                    console.error("Object not found");
                    console.log(matrix[y][x]);
            }

            rect(x * side, y * side, side, side);
        }
    }
}

function handleClearSubmit(){
    console.log("handel Clear Submit");
    socket.emit("clear Matrix");
}
clearButton.onclick = handleClearSubmit;

function handleRandMatrixSubmit(){
    console.log("handle new Rand Matrix Submit");
    socket.emit("get New Rand Matrix");
}
randMatrixButton.onclick = handleRandMatrixSubmit;

//window.onload = main;