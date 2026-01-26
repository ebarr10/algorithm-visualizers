export default class BreadthFirstSearch {
    constructor(maze, setVisitedCells, width, height) {
        this.maze = maze;
        this.setVisitedCells = setVisitedCells;
        this.width = width;
        this.height = height;
        this.dirs = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
    }

    bfs(startNode) {
        let queue = [startNode];
        let visited = new Set([`${startNode[0]},${startNode[1]}`]);

        const visitCell = ([x, y]) => {
            this.setVisitedCells((prev) => {
                const next = new Set(prev);
                next.add(`${x},${y}`);
                return next;
            });
            return this.maze[y][x] === "end";
        };

        const step = () => {
            if (queue.length === 0) {
                console.log("BFS complete");
                return;
            }
            const [x, y] = queue.shift();
            console.log(`Visiting cell: (${x}, ${y}) - New Step!`);

            for (const [dx, dy] of this.dirs) {
                const nx = x + dx;
                const ny = y + dy;
                if (
                    nx >= 0 &&
                    nx < this.width &&
                    ny >= 0 &&
                    ny < this.height &&
                    !visited.has(`${nx},${ny}`)
                ) {
                    visited.add(`${nx},${ny}`);
                    if (
                        this.maze[ny][nx] === "path" ||
                        this.maze[ny][nx] === "end"
                    ) {
                        if (visitCell([nx, ny])) return true;
                        queue.push([nx, ny]);
                    }
                }
            }
            setTimeout(step, 100); // Delay for visualization
        };

        step();
        return false;
    }
}
