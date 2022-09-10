const fs = require("fs");
const dummyText = "Apple yep";

function main(){
    
    fs.writeFileSync("dummytext.txt", dummyText);
    let text = fs.readFileSync("dummytext.txt").toString();
    console.log(text);

    fs.writeFileSync("undummytext.txt", text.replace("Apple", "Microsoft"))
}
main();