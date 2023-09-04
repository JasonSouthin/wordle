import React from "react";
import style from "./Keyboard.module.css";
import Key from "../Key";

const keyboardLayout = [
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "enter z x c v b n m back",
];

function getStatusByLetter(validatedGuesses) {
    let statusObj = {};

    validatedGuesses.forEach((guess) => {
        guess.forEach(({ letter, status }) => {
            statusObj[letter] = status;
        });
    });

    return statusObj;
}

function Keyboard({ handleKeyPressed, validatedGuesses }) {
    function handleKeyPress(event) {
        event.preventDefault();
        const keyPressed =
            event.nativeEvent.submitter.dataset.key.toUpperCase();
        handleKeyPressed(keyPressed);
    }

    const statusByLetter = getStatusByLetter(validatedGuesses);

    return (
        <form onSubmit={handleKeyPress}>
            <div className={style.keyboard}>
                {keyboardLayout.map((layout, index) => (
                    <Key
                        key={index}
                        keyLayout={layout}
                        statusByLetter={statusByLetter}
                    />
                ))}
            </div>
        </form>
    );
}

export default Keyboard;
