module.exports = class Fleischfresser extends Lebewesen {
    constructor(x, y) {
        super(x, y);
        this.hunger = 8;
        this.cosectentEating = 0;
    }

    eatOrMove() {
        if (this.hunger > 0) {
            let grassfresserFields = this.chooseCell(2);
            if (grassfresserFields.length > 0) {   //eat

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
                this.cosectentEating++;
                this.hunger += 4;
            } else { //move
                this.move();
            }
        } else { //die
            this.die();
        }

        if (this.cosectentEating >= 8) {
            if (this.hunger <= 0) {
                console.log("hunger level: " + this.hunger)

            }
            this.reproduce();

        }

    }


    move() {
        let grassFields = this.chooseCell(0);
        if (grassFields.length > 0) {
            matrix[this.y][this.x] = 0;
            let posNewGrassObj = grassFields[round(random(0, grassFields.length - 1))];
            this.x = posNewGrassObj[0];
            this.y = posNewGrassObj[1];
            matrix[this.y][this.x] = 3;
        }
        this.cosectentEating = 0;
        this.hunger--;
    }


    reproduce() {
        if (this.cosectentEating >= 8) {
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0) {
                let posNewGrassfresserObj = emptyFields[round(random(0, emptyFields.length - 1))];
                let grassfresserObj = new Fleischfresser(posNewGrassfresserObj[0], posNewGrassfresserObj[1]);
                grassfresserArr.push(grassfresserObj);
                matrix[posNewGrassfresserObj[1]][posNewGrassfresserObj[0]] = 2;
            }
            this.cosectentEating = 0;
        }

    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in fleischFresserArr) {
            if (this.x == fleischFresserArr[i].x && this.y == fleischFresserArr[i].y) {

                fleischFresserArr.splice(i, 1)
            }
        }
    }

    grassfresserEaten() {
        for (let i in grassfresserArr) {
            if (this.x == grassfresserArr[i].x && this.y == grassfresserArr[i].y) {
                //matrix[this.y][this.x] = 0;
                grassfresserArr.splice(i, 1)
            }
        }
    }


}