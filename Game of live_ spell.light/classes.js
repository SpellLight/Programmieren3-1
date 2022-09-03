//classe Defienieren

class Lebewesen{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.age = 0;

        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(searchCharacter){
        let found = [];
        for (let i in this.neibourghing){
            //hole position des nachbarfeldes
            let x = this.neibourghing[i][0];
            let y = this.neibourghing[i][1];
            
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // überprüfen ob das Feld leer ist
                if (matrix[y][x] == searchCharacter){
                    found.push(this.neibourghing[i])
                }
            }
        }   
        return found;
    }

    getNewNeibourghing(){
        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }


}


class Grass extends Lebewesen{
    //Funktion, Erzeugen von Objecten
    constructor(x, y){
        super(x,y);
        this.mutationCounter = 0;
        this.matationtime = random(5, matrix.length);
    }

    // Verhalten - Methoden (änlich wie funktionen)
    
    //methode zum vermehren

    spread(){
        if (this.age >= 6){
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0){
                let posNewGrassObj = emptyFields[round(random(0, emptyFields.length - 1))];
                let grassObj = new Grass(posNewGrassObj[0], posNewGrassObj[1]);
                grassArr.push(grassObj);
                matrix[posNewGrassObj[1]][posNewGrassObj[0]] = 1;
            }
            this.age = 0;
        }
        this.age ++
        this.mutate();
    }

    grassEaten(){
        for (let i in grassArr){
            if (this.x == grassArr[i].x && this.y == grassArr[i].y){
                //matrix[this.y][this.x] = 0;
                grassArr.splice(i, 1)
            }
        }   
    }

    mutate(){
        this.mutationCounter ++;
        if ( this.mutationCounter >= this.matationtime){
            let x = this.x;
            let y = this.y;
            let mutatedGrassObj = new MutandGrass(x, y);
            mutandgrassArr.push(mutatedGrassObj);
            matrix[y][x] = 5;
            this.grassEaten()
        }
    }

    
}


class Grassfresser{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.cosectentEating = 0;
        
        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],matrix[y][x]
        ];
        
    }

    getNewNeibourghing(){
        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(searchCharacter){
        this.getNewNeibourghing();
        let found = [];
        for (let i in this.neibourghing){
            //hole position des nachbarfeldes
            let x = this.neibourghing[i][0];
            let y = this.neibourghing[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // überprüfen ob das Feld leer ist
                if (matrix[y][x] == searchCharacter){
                    found.push(this.neibourghing[i])
                }
            }
        }   
        return found;
    }

    eatOrMove(){
        if (this.energy > 0){
            let grassFields = this.chooseCell(1).concat(this.chooseCell(5));
            if (grassFields.length > 0){   //eat

                matrix[this.y][this.x] = 0;

                let posNewGrassObj = grassFields[round(random(0, grassFields.length - 1))];
                this.x = posNewGrassObj[0];
                this.y = posNewGrassObj[1];
                this.grassEaten();
                matrix[this.y][this.x] = 2;
                this.cosectentEating ++;
                this.energy ++;
            }else{ //move
                this.move();
            }
        }else{ //die
            this.die();
        }
        
        if (this.cosectentEating >= 5 ){
            this.reproduce();
        }

    }


    move(){
        let grassFields = this.chooseCell(0);
            if (grassFields.length > 0){  
                matrix[this.y][this.x] = 0;
                let posNewGrassObj = grassFields[round(random(0, grassFields.length - 1))];
                this.x = posNewGrassObj[0];
                this.y = posNewGrassObj[1];
                matrix[this.y][this.x] = 2;
            }
        this.cosectentEating = 0;
        this.energy --;
    }
    

    reproduce(){
        if (this.cosectentEating >= 5){
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0){
                let posNewGrassfresserObj = emptyFields[round(random(0, emptyFields.length - 1))];
                let grassfresserObj = new Grassfresser(posNewGrassfresserObj[0], posNewGrassfresserObj[1]);
                grassfresserArr.push(grassfresserObj);
                matrix[posNewGrassfresserObj[1]][posNewGrassfresserObj[0]] = 2;
            }
            this.cosectentEating = 0;
        }
        
    }

    die(){
        
        for (let i in grassfresserArr){
            if (this.x == grassfresserArr[i].x && this.y == grassfresserArr[i].y){
                matrix[this.y][this.x] = 0;
                grassfresserArr.splice(i, 1)
            }
        }   
    }

    grassEaten(){
        
        for (let i in grassArr){
            if (this.x == grassArr[i].x && this.y == grassArr[i].y){
                //matrix[this.y][this.x] = 0;
                grassArr.splice(i, 1);
            }
        }
        for(let i in mutandgrassArr){
            if (this.x == mutandgrassArr[i].x && this.y == mutandgrassArr[i].y){
                mutandgrassArr.splice(i, 1);
            }
        }
    }

}


class Fleischfresser{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.hunger = 8;
        this.cosectentEating = 0;
        
        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
        
        
    }

    getNewNeibourghing(){
        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(searchCharacter){
        this.getNewNeibourghing();
        let found = [];
        for (let i in this.neibourghing){
            //hole position des nachbarfeldes
            let x = this.neibourghing[i][0];
            let y = this.neibourghing[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // überprüfen ob das Feld leer ist
                if (matrix[y][x] == searchCharacter){
                    found.push(this.neibourghing[i])
                }
            }
        }   
        return found;
    }

    eatOrMove(){
        if (this.hunger > 0){
            let grassfresserFields = this.chooseCell(2);
            if (grassfresserFields.length > 0){   //eat

                //matrix[this.y][this.x] = 0;

                let posNewGrassObj = grassfresserFields[round(random(0, grassfresserFields.length - 1))];
                //this.x = posNewGrassObj[0];
                //this.y = posNewGrassObj[1];
                
                this.grassfresserEaten();
                let x = posNewGrassObj[0];
                let y = posNewGrassObj[1];
                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;
                this.x = posNewGrassObj[0];
                this.y = posNewGrassObj[1];
                this.cosectentEating ++;
                this.hunger += 4;
            }else{ //move
                this.move();
            }
        }else{ //die
            this.die();
        }

        if (this.cosectentEating >= 8 ){
            if (this.hunger <= 0){
                console.log("hunger level: " + this.hunger)

            }
            this.reproduce();
            
        }

    }


    move(){
        let grassFields = this.chooseCell(0);
        if (grassFields.length > 0){  
            matrix[this.y][this.x] = 0;
            let posNewGrassObj = grassFields[round(random(0, grassFields.length - 1))];
            this.x = posNewGrassObj[0];
            this.y = posNewGrassObj[1];
            matrix[this.y][this.x] = 3;
        }
        this.cosectentEating = 0;
        this.hunger --;
    }
    

    reproduce(){
        if (this.cosectentEating >= 8){
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0){
                let posNewGrassfresserObj = emptyFields[round(random(0, emptyFields.length - 1))];
                let grassfresserObj = new Fleischfresser(posNewGrassfresserObj[0], posNewGrassfresserObj[1]);
                grassfresserArr.push(grassfresserObj);
                matrix[posNewGrassfresserObj[1]][posNewGrassfresserObj[0]] = 2;
            }
            this.cosectentEating = 0;
        }
        
    }

    die(){
        matrix[this.y][this.x] = 0;
        for (let i in fleischFresserArr){
            if (this.x == fleischFresserArr[i].x && this.y == fleischFresserArr[i].y){
               
                fleischFresserArr.splice(i, 1)
            }
        }   
    }

    grassfresserEaten(){
        for (let i in grassfresserArr){
            if (this.x == grassfresserArr[i].x && this.y == grassfresserArr[i].y){
                //matrix[this.y][this.x] = 0;
                grassfresserArr.splice(i, 1)
            }
        }   
    }


}


/*
wizard class description:
    - walks over grass making it disapear
    - turns "grassfresser" into Grass
    - turns "fleischfresser" into "grassfresser"
    - only matix.length/20 wizards per game (randomly placed)
    - lives infinitly
*/

class Wisard{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    getNewNeibourghing(){
        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(searchCharacter){
        this.getNewNeibourghing();
        let found = [];
        for (let i in this.neibourghing){
            //hole position des nachbarfeldes
            let x = this.neibourghing[i][0];
            let y = this.neibourghing[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // überprüfen ob das Feld leer ist
                if (matrix[y][x] == searchCharacter){
                    found.push(this.neibourghing[i])
                }
            }
        }   
        return found;
    }

    moveOrTranzform(){
        let grassAndEmptyFields = this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(5));
        let grassfresserFields = this.chooseCell(2);        
        let fleischfresserFields = this.chooseCell(3);

        if (grassfresserFields.length > 0 || fleischfresserFields.length > 0){ //tranzform sth.
            this.transGrassfresser();
            this.transFleischfresser();

        }else{ //move
            if (grassAndEmptyFields.length > 0){
                matrix[this.y][this.x] = 0;

                function ifIsGrass(){
                    let posNewWizardObj = grassAndEmptyFields[round(random(0, grassAndEmptyFields.length - 1))];
                    let x = posNewWizardObj[0];
                    let y = posNewWizardObj[1];

                    for (let i in grassArr){
                        if (x == grassArr[i].x && y == grassArr[i].y){
                            grassArr.splice(i, 1);
                        }
                    }
                    return posNewWizardObj;
                }

                let posNewWizard = ifIsGrass();

                let x = posNewWizard[0];
                let y = posNewWizard[1];
                matrix[y][x] = 4;

                this.x = posNewWizard[0];
                this.y = posNewWizard[1];
            }
            
        }
        
    }

    transGrassfresser(){
        let grassfresserFields = this.chooseCell(2);
        for (let i in grassfresserFields){
            let x = grassfresserFields[i][0];
            let y = grassfresserFields[i][1];

            for (let j in grassfresserArr){
                if (x == grassfresserArr[j].x && y == grassfresserArr[j].y){
                    grassfresserArr.splice(j, 1)
                    let grassObj = new Grass(x, y);
                    grassArr.push(grassObj);
                    matrix[y][x] = 1;
                }
            }
        }
    }

    transFleischfresser(){
        let fleischfresserFields = this.chooseCell(3);

        for (let i in fleischfresserFields){
            let x = fleischfresserFields[i][0];
            let y = fleischfresserFields[i][1];

            for (let j in fleischFresserArr){
                if (x == fleischFresserArr[j].x &&  y == fleischFresserArr[j].y){
                    fleischFresserArr.splice(j, 1);
                    let grassfresserObj = new Grassfresser(x, y);
                    grassfresserArr.push(grassfresserObj);
                    matrix[y][x] = 2;
                }
            }
        }
    }
}




/*
class description:
    spreads faster, dies after certen time
*/
class MutandGrass{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.age = 0;
        this.ageIG = 0;

        this.neibourghing =[
            [this.x - 1, this.y - 1],
            [this.x   , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x   , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
        
        
    }

    chooseCell(searchCharacter){
        let found = [];
        for (let i in this.neibourghing){
            //hole position des nachbarfeldes
            let x = this.neibourghing[i][0];
            let y = this.neibourghing[i][1];
            
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // überprüfen ob das Feld leer ist
                if (matrix[y][x] == searchCharacter){
                    found.push(this.neibourghing[i])
                }
            }
        }   
        return found;
    }

    spread(){
        if (this.ageIG < 6){
            if (this.age >= 2){
                let emptyFields = this.chooseCell(0);
                if (emptyFields.length > 0){
                    let posNewGrassObj = emptyFields[round(random(0, emptyFields.length - 1))];
                    let grassObj = new MutandGrass(posNewGrassObj[0], posNewGrassObj[1]);
                    mutandgrassArr.push(grassObj);
                    matrix[posNewGrassObj[1]][posNewGrassObj[0]] = 5;
                }
                this.age = 0;
            }else{
                this.age ++;
            }
            this.ageIG ++;
        }else{
            this.dead();
        }
    }

    dead(){
        for (let i in mutandgrassArr){
            if (this.x == mutandgrassArr[i].x && this.y == mutandgrassArr[i].y){
                matrix[this.y][this.x] = 0;
                mutandgrassArr.splice(i, 1)
            }
        }   
    }

    
}
    
