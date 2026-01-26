import { useMemo, useState } from "react";
import ConstructMaze from "./generate_maze";
import BreadthFirstSearch from "./bfs";
import DepthFirstSearch from "./dfs";
import "./MazeGrid.css";

function MazeGrid() {
    const [maze, setMaze] = useState([]);
    const [visitedCells, setVisitedCells] = useState(new Set());
    const [timeoutIds, setTimeoutIds] = useState([]);
    const constructMaze = new ConstructMaze();
    const height = 20;
    const width = 20;

    const bfsSolver = useMemo(
        () =>
            new BreadthFirstSearch(
                maze,
                setVisitedCells,
                setTimeoutIds,
                width,
                height,
            ),
        [maze, setVisitedCells, setTimeoutIds, width, height],
    );

    const dfsSolver = useMemo(
        () =>
            new DepthFirstSearch(
                maze,
                setVisitedCells,
                setTimeoutIds,
                width,
                height,
            ),
        [maze, setVisitedCells, setTimeoutIds, width, height],
    );

    function clearTimeouts() {
        timeoutIds.forEach((id) => clearTimeout(id));
        setTimeoutIds([]);
    }

    function refreshMaze() {
        clearTimeouts();
        setVisitedCells(new Set());
        setMaze(constructMaze.generateMaze(height, width));
    }

    function startSearch(algorithm) {
        clearTimeouts();
        setVisitedCells(new Set());

        if (algorithm === "bfs") {
            bfsSolver.bfs([1, 0]);
        } else if (algorithm === "dfs") {
            dfsSolver.dfs([1, 0]);
        }
    }

    return (
        <div className="maze-grid">
            <button className="maze-button" onClick={() => refreshMaze()}>
                {maze.length !== 0 ? "Refresh Maze" : "Generate Maze"}
            </button>
            {maze.length !== 0 && (
                <>
                    <button
                        className="maze-button"
                        onClick={() => startSearch("bfs")}
                    >
                        Breadth First Search
                    </button>
                    <button
                        className="maze-button"
                        onClick={() => startSearch("dfs")}
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
