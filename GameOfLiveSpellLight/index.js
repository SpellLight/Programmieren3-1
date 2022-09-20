
const socket = io();
const clearButton = document.getElementById('clear');

let side = 10;

socket.on("first send matrix", function(data){
    createCanvas(data[0].length * side, data.length * side + 1);
    drawMatrix(data);
})

socket.on('send matrix', function(data){
    drawMatrix(data);
    console.log(data);
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
                    fill("gray")
                    break;
                case 1:
                    fill("green")
                    break;
                case 2:
                    fill("yellow")
                    break;
                case 3:
                    fill("red")
                    break;
                case 4:
                    fill("orange")
                    break;
                case 5:
                    fill("lightgreen")
                    break;
                default:
                    console.error("Object not found")
                    console.log(matrix[y][x])
            }

            rect(x * side, y * side, side, side);
        }
    }
}

function handleClearSubmit(){
    io.sockets.emit("clear Matrix");
}

clearButton.onclick = handleClearSubmit;

//window.onload = main;