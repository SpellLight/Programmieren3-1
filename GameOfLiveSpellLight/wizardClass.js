/*
wizard class description:
    - walks over grass making it disapear
    - turns "grassfresser" into Grass
    - turns "fleischfresser" into "grassfresser"
    - only matix.length/20 wizards per game (randomly placed)
    - lives infinitly
*/

module.exports = class Wisard extends Lebewesen {
    constructor(x, y) {
        super(x, y);
    }

    moveOrTranzform() {
        let grassAndEmptyFields = this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(5));
        let grassfresserFields = this.chooseCell(2);
        let fleischfresserFields = this.chooseCell(3);

        if (grassfresserFields.length > 0 || fleischfresserFields.length > 0) { //tranzform sth.
            this.transGrassfresser();
            this.transFleischfresser();

        } else { //move
            if (grassAndEmptyFields.length > 0) {
                matrix[this.y][this.x] = 0;

                function ifIsGrass() {
                    let posNewWizardObj = grassAndEmptyFields[round(random(0, grassAndEmptyFields.length - 1))];
                    let x = posNewWizardObj[0];
                    let y = posNewWizardObj[1];

                    for (let i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
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

    transGrassfresser() {
        let grassfresserFields = this.chooseCell(2);
        for (let i in grassfresserFields) {
            let x = grassfresserFields[i][0];
            let y = grassfresserFields[i][1];

            for (let j in grassfresserArr) {
                if (x == grassfresserArr[j].x && y == grassfresserArr[j].y) {
                    grassfresserArr.splice(j, 1)
                    let grassObj = new Grass(x, y);
                    grassArr.push(grassObj);
                    matrix[y][x] = 1;
                }
            }
        }
    }

    transFleischfresser() {
        let fleischfresserFields = this.chooseCell(3);

        for (let i in fleischfresserFields) {
            let x = fleischfresserFields[i][0];
            let y = fleischfresserFields[i][1];

            for (let j in fleischFresserArr) {
                if (x == fleischFresserArr[j].x && y == fleischFresserArr[j].y) {
                    fleischFresserArr.splice(j, 1);
                    let grassfresserObj = new Grassfresser(x, y);
                    grassfresserArr.push(grassfresserObj);
                    matrix[y][x] = 2;
                }
            }
        }
    }
}
