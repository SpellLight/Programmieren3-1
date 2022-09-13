let clickCounter = 0;

console.log("test");
function clickhandler(event){
    clickCounter++;
    
    //console.log(clickCounter);
    let str = "Clickanzahl: " + clickCounter;
    this.innerText = str;
}

let p  = document.getElementById("pID");
//console.log(p);
p.addEventListener("click", clickhandler);

function bodyClick(event){
    //console.log(event);
    console.log("Es wurde geklickt bei " + event.pageX + ", " + event.pageY);
}

window.onclick = bodyClick;

function setup(){
    background("red");
}

function mouseClicked(){
    console.log("P5: " + mouseX + ", " + mouseY);
}

function windowLoad(event){
    console.log("Loaded");
}

window.onload = windowLoad;

function keyDown(event){
    console.log("You Printed " + event.key);
}

window.onkeydown = keyDown;

function keyPressed(){
    console.log(key);
}