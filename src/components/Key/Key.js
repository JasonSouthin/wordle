import React from "react";
import style from "./Key.module.css";

function Key({ keyLayout, statusByLetter }) {
    return (
        <div className={style.keyboardModule}>
            {keyLayout.split(" ").map((key) => {
                const className = `${style.keyboardButton} ${
                    style[statusByLetter[key.toUpperCase()]]
                        ? style[statusByLetter[key.toUpperCase()]]
                        : ""
                }`;
                return (
                    <button
                        data-key={key}
                        key={key}
                        className={className}>
                        {key}
                    </button>
                );
            })}
        </div>
    );
}

export default Key;
