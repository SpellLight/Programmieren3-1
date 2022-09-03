class Lebewesen {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.age = 0;

        this.neibourghing = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(searchCharacter) {
        let found = [];
        for (let i in this.neibourghing) {
            //hole position des nachbarfeldes
            let x = this.neibourghing[i][0];
            let y = this.neibourghing[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                // überprüfen ob das Feld leer ist
                if (matrix[y][x] == searchCharacter) {
                    found.push(this.neibourghing[i])
                }
            }
        }
        return found;
    }

    getNewNeibourghing() {
        this.neibourghing = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }


}