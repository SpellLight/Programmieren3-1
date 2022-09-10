const fs = require("fs");

const obj = {
    name: "Cl",
    vorname: "SAbine",
    age: 120,
    tumo_student: false
}


function main(){
    let txt =JSON.stringify(obj);

    fs.writeFileSync("obj.json", txt);

    let text = fs.readFileSync("obj.json").toString();
    console.log(text);
    let jsobj = JSON.parse(text);

    console.log(jsobj);
    console.log(jsobj.age)
}

main();