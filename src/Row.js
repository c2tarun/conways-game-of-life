import React from "react";

export default function Row({ children }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            {children}
        </div>
    );
}
