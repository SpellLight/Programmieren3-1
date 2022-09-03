let obj = {
    //first_name, last_name ...
    first_name : "spell",
    sayHello() {
        console.log("Hello, ", this.first_name);
    }
}

console.log(obj);
console.log(obj.first_name);
obj.sayHello();