import { useState, useEffect } from "react";
import lifeHeart from "../assets/life.svg";
import deadHeart from "../assets/dead.svg";
import PopupMessage from "./Popup";
import Instructions from "./Instructions";

const Home = () => {
    const [row, setRow] = useState(3);
    const [col, setCol] = useState(3);
    const [currentPath, setCurrentPath] = useState([]);
    const [reviewPath, setReviewPath] = useState([]);
    const [activeCells, setActiveCells] = useState([]);
    const [index, setIndex] = useState(0);
    const [tracePath, setTracePath] = useState([]);
    const [trace, setTrace] = useState(false);
    const [life, setLife] = useState(3);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const gridSize = Math.min(500 / row, 500 / col);

    const allDirections = [
        [0, 0], // stay in the current column
        [-1, 0], // move up in the same column
        [1, 0], // move down in the same column
    ];

    const directions = [
        [0, 1], // right
        [-1, 1], // upRight
        [1, 1], // downRight
    ];

    const generatePath = (rows, columns) => {
        let path = [];
        let currentRow = Math.floor(Math.random() * rows); // Start from a random row in the first column

        for (let col = 0; col < columns; col++) {
            let count = Math.floor(Math.random() * 3) + 1; // Choose up to 3 cells in the current column

            for (let i = 0; i < count; i++) {
                path.push([currentRow, col]);

                if (i < count - 1) {
                    // Stay in the same column and move up/down or stay in place
                    let [dx, dy] =
                        allDirections[
                            Math.floor(Math.random() * allDirections.length)
                        ];
                    let newRow = currentRow + dx;

                    // Ensure the new row is within bounds
                    if (newRow >= 0 && newRow < rows) {
                        currentRow = newRow;
                    }
                }
            }

            if (col < columns - 1) {
                // Move to the next column
                let [dx, dy] =
                    directions[Math.floor(Math.random() * directions.length)];
                let newRow = currentRow + dx;

                // Ensure the new row is within bounds
                if (newRow >= 0 && newRow < rows) {
                    currentRow = newRow;
                } else {
                    // If out of bounds, stay in the current row for the next column
                    currentRow = Math.min(Math.max(newRow, 0), rows - 1);
                }
            }
        }

        // Create a Set to filter unique elements
        const uniquePath = Array.from(
            new Set(path.map(JSON.stringify)),
            JSON.parse
        );

        return uniquePath;
    };

    const handleStart = () => {
        const newPath = generatePath(row, col);
        setTrace(false);
        setCurrentPath(newPath);
        setActiveCells([]);
        setReviewPath([]); // Clear reviewPath
        handlePlay(newPath);
    };

    const handleReview = () => {
        setTrace(false);
        setReviewPath(currentPath); // Set reviewPath to the current path
        handlePlay(currentPath); // Animate using the current path
    };

    const handlePlay = (route) => {
        setActiveCells([]);
        route.forEach(([r, c], index) => {
            setTimeout(() => {
                setActiveCells((prevCells) => [...prevCells, `${r}-${c}`]);
            }, index * 500);
        });
    };

    const handleYourTurn = () => {
        setTrace(true);
        setActiveCells([]);
    };

    const deductLife = () => {
        setLife((prev) => {
            const newLife = prev - 1;
            if (newLife > 0) {
                setMessage("Wrong Move!👎");
                setShowPopup(true);
            } else {
                setMessage("You Lost!");
                setShowPopup(true);
            }
            return newLife;
        });
    };

    const handleClick = (r, c) => {
        if (life) {
            const [pathRow, pathCol] = currentPath[index];
            if (r === pathRow && c === pathCol) {
                setTracePath((prev) => [...prev, `${r}-${c}`]);
                console.log("correct choice");
                setIndex((ind) => ind + 1);
            } else {
                deductLife();
            }
        } else {
            setMessage("🖱️ Press Start!");
            setShowPopup(true);
        }
    };

    const onClose = () => {
        setShowPopup(false);
    };

    return (
        <div className="flex">
            <div className="min-h-screen w-1/4 flex flex-col gap-y-8 justify-center items-center">
                <button
                    className="bg-[#1868DB] px-6 py-2 rounded-md font-semibold text-white w-36 shadow"
                    onClick={handleStart}
                >
                    Start
                </button>
                <button
                    className="bg-[#1868DB] px-6 py-2 rounded-md font-semibold text-white w-36 shadow"
                    onClick={handleYourTurn}
                >
                    Your Turn
                </button>
                <button
                    className="bg-[#1868DB] px-6 py-2 rounded-md font-semibold text-white w-36 shadow"
                    onClick={handleReview}
                >
                    Review
                </button>
                <div className="">
                    {
                        <div className="flex">
                            {Array(life)
                                .fill(0)
                                .map((_, index) => (
                                    <img
                                        key={index}
                                        src={lifeHeart}
                                        className="h-12"
                                    />
                                ))}
                            {Array(3 - life)
                                .fill(0)
                                .map((_, index) => (
                                    <img
                                        key={`second-${index}`}
                                        src={deadHeart}
                                        className="h-12"
                                    />
                                ))}
                        </div>
                    }
                </div>
            </div>
            <div className="min-h-screen w-2/4 flex justify-center items-center">
                <div
                    className="grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${col}, ${gridSize}px)`,
                        gridTemplateRows: `repeat(${row}, ${gridSize}px)`,
                        gap: "5px",
                    }}
                >
                    {Array.from({ length: row }).map((_, rowIndex) =>
                        Array.from({ length: col }).map((_, colIndex) => {
                            const key = `${rowIndex}-${colIndex}`;
                            const isActive = activeCells.includes(key);
                            const retrace = tracePath.includes(
                                `${rowIndex}-${colIndex}`
                            );

                            return (
                                <div
                                    key={key}
                                    className={`${
                                        isActive
                                            ? "bg-red-500 scale-animation"
                                            : "bg-blue-500"
                                    } ${
                                        retrace && trace
                                            ? "bg-red-500 scale-animation"
                                            : "bg-blue-500"
                                    }`}
                                    onClick={() =>
                                        handleClick(rowIndex, colIndex)
                                    }
                                ></div>
                            );
                        })
                    )}
                </div>
            </div>
            <div className="min-h-screen w-1/4 flex justify-center items-center">
                <Instructions />
            </div>

            <PopupMessage
                message={message}
                showPopup={showPopup}
                onClose={onClose}
            />
        </div>
    );
};

export default Home;
