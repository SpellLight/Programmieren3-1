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

const Lebewesen = require("./LebewesenClass")
const Grass = require("./GrassClass");
const Grassfresser = require("./grassFresserClass");
const Fleischfresser = require("./fleichFresserClass");
const MutandGrass = require("./mutantGrass");
const Wizard = require("./wizardClass");

let matrix = [];
function getRandMatrix(x, y){
    for (let i = 0; i < y; i++){
        let arr = [];
        for (let j = 0; j < x; j++){
            let r = Math.round(random(0, 6));
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
        matrix.push(arr)
    }
    for (let i = 0; i < matrix.length / 20 + matrix[0].length / 20; i++){
        let xW = round(random(0, matrix[0].length - 1))
        let yW = round(random(0, matrix.length - 1))
        matrix[yW][xW] = 4;
    }
}




//lebewesen
let grassArr = [];
let mutandgrassArr = [];
let grassfresserArr = [];
let fleischFresserArr = [];
let wizardArr = [];


function checkRed(){
    if (fleischFresserArr.length == 0){
        for(let y = 0; y < matrix.length; y++){
            for (let x = 0; x < matrix[y].length; x++){
                if (matrix[y][x] == 3){
                    matrix[y][x] = 0;
                }
            }
        }
    } 
}

let side = 10;

function setup(){
    //frameRate(5);

    getRandMatrix(50, 50)

    createCanvas(matrix[0].length * side, matrix.length * side + 1);
    background("#acacac")

    //lebewesen erzeugen:

    //let grassObj = new Grass(1, 0);
    //grassArr.push(grassObj);

    
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
    
    for (let y = 0; y < matrix.length; y++){
        console.log("\n");
        for (let x = 0; x < matrix[y].length; x++){
            console.log(matrix[y][x])
            console.log("position: ",x, y);
        }
        
    }
}

setup();
setInterval(draw(), 1000);