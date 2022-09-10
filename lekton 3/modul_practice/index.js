const square = require("./modul");
let mySquareObject = new square.Square(5);

function main() {
    console.log(mySquareObject.getArea());
}

main();