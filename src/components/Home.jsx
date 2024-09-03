import React, { useState } from "react";
import PopupMessage from "./Popup";
import Instructions from "./Instructions";
import GameControls from "./GameControls";
import GameBoard from "./GameBoard";

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
        [0, 0],
        [-1, 0],
        [1, 0],
    ];

    const directions = [
        [0, 1],
        [-1, 1],
        [1, 1],
    ];

    const generatePath = (rows, columns) => {
        let path = [];
        let currentRow = Math.floor(Math.random() * rows);

        for (let col = 0; col < columns; col++) {
            let count = Math.floor(Math.random() * 3) + 1;

            for (let i = 0; i < count; i++) {
                path.push([currentRow, col]);

                if (i < count - 1) {
                    let [dx, dy] =
                        allDirections[
                            Math.floor(Math.random() * allDirections.length)
                        ];
                    let newRow = currentRow + dx;

                    if (newRow >= 0 && newRow < rows) {
                        currentRow = newRow;
                    }
                }
            }

            if (col < columns - 1) {
                let [dx, dy] =
                    directions[Math.floor(Math.random() * directions.length)];
                let newRow = currentRow + dx;

                if (newRow >= 0 && newRow < rows) {
                    currentRow = newRow;
                } else {
                    currentRow = Math.min(Math.max(newRow, 0), rows - 1);
                }
            }
        }

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
        setReviewPath([]);
        handlePlay(newPath);
    };

    const handleReview = () => {
        if (life) {
            setTrace(false);
            setReviewPath(currentPath);
            handlePlay(currentPath);
        } else {
            setMessage("Game Over! 👉 Start a New Game 🎮");
            setShowPopup(true);
        }
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
        if (life) {
            setTrace(true);
            setActiveCells([]);
        } else {
            setMessage("Game Over! 👉 Start a New Game 🎮");
            setShowPopup(true);
        }
    };

    const deductLife = () => {
        setLife((prev) => {
            const newLife = prev - 1;
            if (newLife > 0) {
                setMessage("Oops! Wrong Move! 👎");
                setShowPopup(true);
            } else {
                setMessage("Game Over! You Lost! 😢");
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
                setIndex((ind) => ind + 1);
            } else {
                deductLife();
            }
        } else {
            setMessage("🎮 Press Start to Play!");
            setShowPopup(true);
        }
    };

    const onClose = () => {
        setShowPopup(false);
    };

    return (
        <div className="">
            <div className="flex">
                <GameControls
                    life={life}
                    onStart={handleStart}
                    onYourTurn={handleYourTurn}
                    onReview={handleReview}
                />
                <GameBoard
                    row={row}
                    col={col}
                    gridSize={gridSize}
                    activeCells={activeCells}
                    tracePath={tracePath}
                    trace={trace}
                    onClick={handleClick}
                />
                <div className="min-h-screen w-1/4 flex justify-center items-center">
                    <Instructions />
                </div>
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
