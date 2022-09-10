const fs = require("fs");

function main(){
    let file = "hello.txt";
    fs.appendFileSync(file, "Hello world\n");
    fs.appendFileSync(file, "Its me Mario\n");
}

main();