import React from "react";

const Instructions = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center pr-16 bg-gray-100 text-justify">
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            <ol className="list-decimal list-inside text-lg space-y-2">
                <li>
                    <strong>Start:</strong> Click the "Start" button to begin a
                    new game and generate a path.
                </li>
                <li>
                    <strong>Your Turn:</strong> Click on the cells in the grid
                    to follow the path. If you choose the wrong cell, you lose a
                    life.
                </li>
                <li>
                    <strong>Review:</strong> Click "Review" to see the correct
                    path after making a wrong choice.
                </li>
                <li>
                    <strong>Lives:</strong> You have 3 lives to complete the
                    path. If you lose all lives, the game is over.
                </li>
                <li>
                    <strong>Restart:</strong> After losing all lives, click
                    "Start" to start over.
                </li>
            </ol>
        </div>
    );
};

export default Instructions;
