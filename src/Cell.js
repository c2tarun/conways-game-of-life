import React from "react";

export default function Cell(props) {
    return (
        <div
            style={{
                border: "1px solid grey",
                height: "15px",
                width: "15px",
                backgroundColor: props.alive ? "black" : "white",
            }}
            onClick={() => {
                console.log(props);
                props.toggle(props.row, props.col);
            }}
        ></div>
    );
}
