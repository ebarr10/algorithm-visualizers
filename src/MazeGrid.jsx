import { useState } from "react";
import "./MazeGrid.css";

function MazeGrid() {
    const [maze, setMaze] = useState([]);

    function generateMaze(height, width) {
        let matrix = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                // eslint-disable-next-line react-hooks/purity
                let cell = Math.random() < 0.4 ? "wall" : "path";
                row.push(cell);
            }
            matrix.push(row);
        }
        matrix[1][0] = "start";
        matrix[height - 2][width - 1] = "end";
        setMaze(matrix);
    }

    return (
        <div className="maze-grid">
            <button className="maze-button" onClick={() => generateMaze(5, 6)}>
                Refresh Maze
            </button>
            <div className="maze">
                {maze.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div
                                className={`cell ${cell}`}
                                key={cellIndex}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MazeGrid;
