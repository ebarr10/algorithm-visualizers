export default class ConstructMaze {
    constructor() {
        this.dirs = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
    }
    generateMaze(height, width) {
        let matrix = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push("wall");
            }
            matrix.push(row);
        }

        const isCellValid = (x, y) => {
            return (
                y >= 0 &&
                x >= 0 &&
                x < width &&
                y < height &&
                matrix[y][x] === "wall"
            );
        };

        const carvePath = (x, y) => {
            matrix[y][x] = "path";
            const directions = this.dirs.sort(() => Math.random() - 0.5);

            for (let [dx, dy] of directions) {
                const nx = x + dx * 2;
                const ny = y + dy * 2;

                if (isCellValid(nx, ny)) {
                    matrix[y + dy][x + dx] = "path";
                    carvePath(nx, ny);
                }
            }
        };

        carvePath(1, 1);

        matrix[1][0] = "start";
        matrix[height - 2][width - 1] = "end";

        return matrix;
    }
}
