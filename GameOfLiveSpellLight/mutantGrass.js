module.exports = class MutandGrass extends Lebewesen {
    constructor(x, y) {
        super(x, y);
        this.ageIG = 0;
    }

    spread() {
        if (this.ageIG < 6) {
            if (this.age >= 2) {
                let emptyFields = this.chooseCell(0);
                if (emptyFields.length > 0) {
                    let posNewGrassObj = emptyFields[round(random(0, emptyFields.length - 1))];
                    let grassObj = new MutandGrass(posNewGrassObj[0], posNewGrassObj[1]);
                    mutandgrassArr.push(grassObj);
                    matrix[posNewGrassObj[1]][posNewGrassObj[0]] = 5;
                }
                this.age = 0;
            } else {
                this.age++;
            }
            this.ageIG++;
        } else {
            this.dead();
        }
    }

    dead() {
        for (let i in mutandgrassArr) {
            if (this.x == mutandgrassArr[i].x && this.y == mutandgrassArr[i].y) {
                matrix[this.y][this.x] = 0;
                mutandgrassArr.splice(i, 1)
            }
        }
    }


}