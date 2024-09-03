import React from "react";

const GameBoard = ({
    row,
    col,
    gridSize,
    activeCells,
    tracePath,
    trace,
    onClick,
}) => {
    return (
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
                                onClick={() => onClick(rowIndex, colIndex)}
                            ></div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default GameBoard;
