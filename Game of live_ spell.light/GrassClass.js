class Grass extends Lebewesen {
    //Funktion, Erzeugen von Objecten
    constructor(x, y) {
        super(x, y);
        this.mutationCounter = 0;
        this.matationtime = random(5, matrix.length);
    }

    // Verhalten - Methoden (änlich wie funktionen)

    //methode zum vermehren

    spread() {
        if (this.age >= 6) {
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0) {
                let posNewGrassObj = emptyFields[round(random(0, emptyFields.length - 1))];
                let grassObj = new Grass(posNewGrassObj[0], posNewGrassObj[1]);
                grassArr.push(grassObj);
                matrix[posNewGrassObj[1]][posNewGrassObj[0]] = 1;
            }
            this.age = 0;
        }
        this.age++
        this.mutate();
    }

    grassEaten() {
        for (let i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                //matrix[this.y][this.x] = 0;
                grassArr.splice(i, 1)
            }
        }
    }

    mutate() {
        this.mutationCounter++;
        if (this.mutationCounter >= this.matationtime) {
            let x = this.x;
            let y = this.y;
            let mutatedGrassObj = new MutandGrass(x, y);
            mutandgrassArr.push(mutatedGrassObj);
            matrix[y][x] = 5;
            this.grassEaten()
        }
    }


}