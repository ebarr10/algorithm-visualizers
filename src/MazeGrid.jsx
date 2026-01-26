import { useMemo, useState } from "react";
import ConstructMaze from "./generate_maze";
import BreadthFirstSearch from "./bfs";
import DepthFirstSearch from "./dfs";
import "./MazeGrid.css";

function MazeGrid() {
    const [maze, setMaze] = useState([]);
    const [visitedCells, setVisitedCells] = useState(new Set());
    const constructMaze = new ConstructMaze();
    const height = 20;
    const width = 20;

    const bfsSolver = useMemo(
        () => new BreadthFirstSearch(maze, setVisitedCells, width, height),
        [maze, setVisitedCells, width, height],
    );

    const dfsSolver = useMemo(
        () => new DepthFirstSearch(maze, setVisitedCells, width, height),
        [maze, setVisitedCells, width, height],
    );

    return (
        <div className="maze-grid">
            <button
                className="maze-button"
                onClick={() => {
                    setVisitedCells(new Set());
                    setMaze(constructMaze.generateMaze(height, width));
                }}
            >
                {maze.length !== 0 ? "Refresh Maze" : "Generate Maze"}
            </button>
            {maze.length !== 0 && (
                <>
                    <button
                        className="maze-button"
                        onClick={() => {
                            setVisitedCells(new Set());
                            bfsSolver.bfs([1, 0]);
                        }}
                    >
                        Breadth First Search
                    </button>
                    <button
                        className="maze-button"
                        onClick={() => {
                            setVisitedCells(new Set());
                            dfsSolver.dfs([1, 0]);
                        }}
                    >
                        Depth First Search
                    </button>
                </>
            )}
            <div className="maze">
                {maze.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div
                                className={`cell ${cell} ${
                                    visitedCells.has(`${cellIndex},${rowIndex}`)
                                        ? "visited"
                                        : ""
                                }`}
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
