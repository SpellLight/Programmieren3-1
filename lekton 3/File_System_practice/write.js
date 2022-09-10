const fs = require("fs");

function main(){
    
    fs.writeFile("hello.txt", "Hello world\n", function(err){console.log("fs.writeFile ended");});
    console.log("fs.writeFile");
}

main();