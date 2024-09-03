import React from "react";
import lifeHeart from "../assets/life.svg";
import deadHeart from "../assets/dead.svg";

const GameControls = ({ life, onStart, onYourTurn, onReview }) => {
    return (
        <div className="min-h-screen w-1/4 flex flex-col gap-y-8 justify-center items-center">
            <button
                className="bg-[#1868DB] px-6 py-2 rounded-md font-semibold text-white w-36 shadow"
                onClick={onStart}
            >
                Start
            </button>
            <button
                className="bg-[#1868DB] px-6 py-2 rounded-md font-semibold text-white w-36 shadow"
                onClick={onYourTurn}
            >
                Your Turn
            </button>
            <button
                className="bg-[#1868DB] px-6 py-2 rounded-md font-semibold text-white w-36 shadow"
                onClick={onReview}
            >
                Review
            </button>
            <div className="">
                <div className="flex">
                    {Array(life)
                        .fill(0)
                        .map((_, index) => (
                            <img key={index} src={lifeHeart} className="h-12" />
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
            </div>
        </div>
    );
};

export default GameControls;
