import React from "react";

export default function Cell(props) {
    return (
        <div
            style={{
                border: "1px solid rgb(227,227,227)",
                height: "15px",
                width: "15px",
                backgroundColor: props.alive ? "rgb(71,71,71)" : "white",
            }}
            onClick={() => {
                console.log(props);
                props.toggle(props.row, props.col);
            }}
        ></div>
    );
}
