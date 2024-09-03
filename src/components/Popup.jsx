import React from "react";

const PopupMessage = ({ showPopup, message, onClose }) => {
    return (
        showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <p className="text-lg mb-4 font-medium">{message}</p>
                    <div className="flex justify-end gap-2">
                        <button
                            className="bg-[#1868DB] px-6 py-2 rounded-md font-semibold text-white w-28 shadow"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default PopupMessage;
