class Grassfresser extends Lebewesen {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.cosectentEating = 0;
    }

    eatOrMove() {
        if (this.energy > 0) {
            let grassFields = this.chooseCell(1).concat(this.chooseCell(5));
            if (grassFields.length > 0) {   //eat

                matrix[this.y][this.x] = 0;

                let posNewGrassObj = grassFields[round(random(0, grassFields.length - 1))];
                this.x = posNewGrassObj[0];
                this.y = posNewGrassObj[1];
                this.grassEaten();
                matrix[this.y][this.x] = 2;
                this.cosectentEating++;
                this.energy++;
            } else { //move
                this.move();
            }
        } else { //die
            this.die();
        }

        if (this.cosectentEating >= 5) {
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
            matrix[this.y][this.x] = 2;
        }
        this.cosectentEating = 0;
        this.energy--;
    }


    reproduce() {
        if (this.cosectentEating >= 5) {
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0) {
                let posNewGrassfresserObj = emptyFields[round(random(0, emptyFields.length - 1))];
                let grassfresserObj = new Grassfresser(posNewGrassfresserObj[0], posNewGrassfresserObj[1]);
                grassfresserArr.push(grassfresserObj);
                matrix[posNewGrassfresserObj[1]][posNewGrassfresserObj[0]] = 2;
            }
            this.cosectentEating = 0;
        }

    }

    die() {

        for (let i in grassfresserArr) {
            if (this.x == grassfresserArr[i].x && this.y == grassfresserArr[i].y) {
                matrix[this.y][this.x] = 0;
                grassfresserArr.splice(i, 1)
            }
        }
    }

    grassEaten() {

        for (let i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                //matrix[this.y][this.x] = 0;
                grassArr.splice(i, 1);
            }
        }
        for (let i in mutandgrassArr) {
            if (this.x == mutandgrassArr[i].x && this.y == mutandgrassArr[i].y) {
                mutandgrassArr.splice(i, 1);
            }
        }
    }

}
