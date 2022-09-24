/*
let matrix = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [5,0,0,0,0,0,0,0]
];
*/

const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static("./"));

app.get("/", function (req, res) {
    //index.html
    res.redirect("index.html");
});

server.listen(3000, function(){
    console.log("Running on port 3000");
});

const Lebewesen = require("./LebewesenClass")
const Grass = require("./GrassClass");
const Grassfresser = require("./grassFresserClass");
const Fleischfresser = require("./fleichFresserClass");
const MutandGrass = require("./mutantGrass");
const Wisard = require("./wizardClass");

matrix = [];
function getRandMatrix(x, y){
    let newMatrix = [];
    for (let i = 0; i < y; i++){
        let arr = [];
        for (let j = 0; j < x; j++){
            let r = Math.floor(Math.random() * 7);
            switch(r){
                case 0:
                    arr.push(0);
                    break;
                case 1:
                    arr.push(0);
                    break
                case 2:
                    arr.push(1);
                    break;
                case 3:
                    arr.push(1);
                    break
                case 4:
                    arr.push(2);
                    break;
                case 5:
                    arr.push(2);
                    break;
                case 6:
                    arr.push(3);
                    break;
                default:
                    console.error("wrong value")
                
            }

        }
        newMatrix.push(arr)
    }
    matrix = newMatrix;
    for (let i = 0; i < matrix.length / 20 + matrix[0].length / 20; i++){
        let xW = Math.floor(Math.random() * matrix[0].length);
        let yW = Math.floor(Math.random() * matrix.length);
        matrix[yW][xW] = 4;
    }
}




//lebewesen
grassArr = [];
mutandgrassArr = [];
grassfresserArr = [];
fleischFresserArr = [];
wizardArr = [];

matrixXsize = 50;
matrixYsize = 50

isRaining = false;


function setup(){
    getRandMatrix(matrixXsize, matrixYsize);
    
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++){
            if (matrix[y][x] == 1){
                let grassObj = new Grass(x, y);
                grassArr.push(grassObj);
            }else if (matrix[y][x] == 2){
                let grassfresserObj = new Grassfresser(x, y);
                grassfresserArr.push(grassfresserObj);
            }else if (matrix[y][x] == 3){
                let fleischfresserObj = new Fleischfresser(x, y);
                fleischFresserArr.push(fleischfresserObj);
            }else if (matrix[y][x] == 4){
                let wizardObj = new Wisard(x, y);
                wizardArr.push(wizardObj);
            }else if (matrix[y][x] == 5) {
                let mutate = new MutandGrass(x, y);
                mutandgrassArr.push(mutate);
            }
        }
    }
}

function draw(){
    //checkRed();
    for (let i in wizardArr){
        wizardArr[i].moveOrTranzform();
    }

    for (let i in grassArr){
        grassArr[i].spread();
    }

    for (let i in grassfresserArr){
        grassfresserArr[i].eatOrMove();
    }

    for (let i in fleischFresserArr){
        fleischFresserArr[i].eatOrMove();
    }

    for (let i in mutandgrassArr){
        mutandgrassArr[i].spread();
    }

    if (Math.floor(Math.random() * 11) == 10){
        isRaining = !isRaining;
    }

    io.sockets.emit("send rain", isRaining);
    io.sockets.emit("send matrix", matrix);
    //console.log(matrix);
}

function clearMatrix(){
    console.log("log clear");
    let matrixNew = [];
    for (let i = 0; i < matrixYsize; i++){
        let arr = [];
        for (let j = 0; j < matrixXsize; j++){
            arr.push(0);  
        }
        matrixNew.push(arr)
    }
    matrix = matrixNew;

    grassArr = [];
    mutandgrassArr = [];
    grassfresserArr = [];
    fleischFresserArr = [];
    wizardArr = [];
}

function getNewRandMatrix(){
    console.log("log new matrix");
    clearMatrix();
    setup();
}

io.on("connection", function(socket){
    io.sockets.emit("first send matrix", matrix);

    socket.on('clear Matrix', function(socket){
        clearMatrix();
    });
    
    socket.on("get New Rand Matrix", function(data){
        getNewRandMatrix();
    });
});



setup();
setInterval(draw, 1000);

