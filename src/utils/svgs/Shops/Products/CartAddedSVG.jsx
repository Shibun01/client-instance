import React from "react";

const TickSVG = () => {
    return (
        <>
            <svg
                width={41}
                height={40}
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexGrow: 0, flexShrink: 0, width: 40, height: 40 }}
                preserveAspectRatio="xMidYMid meet"
            >
                <circle cx="20.3333" cy={20} r={20} fill="#DFF2E1" /> {/* Background circle with a different color */}
                <path
                    d="M14 20l4 4 8-8"
                    stroke="#344054"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
}

export default TickSVG;
