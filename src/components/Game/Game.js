import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput";
import GuessResult from "../GuessResult";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import WonBanner from "../WonBanner";
import LostBanner from "../LostBanner";
import Keyboard from "../Keyboard";
import { checkGuess } from "../../game-helpers";

// // Pick a random word on every pageload.
// const answer = sample(WORDS);
// // To make debugging easier, we'll log the solution in the console.
// console.info({ answer });

const initialGameResult = {
    amountOfGuesses: 0,
    winner: false,
    endGame: false,
    answer: "",
};

function Game() {
    const [guesses, setGuesses] = React.useState([]);
    const [answer, setAnswer] = React.useState(sample(WORDS));
    const [keyboardInput, setKeyboardInput] = React.useState([]);
    const [gameResult, setGameReuslt] =
        React.useState(initialGameResult);

    function handleSubmitGuess(tentitiveGuess) {
        const nextGuesses = [
            ...guesses,
            {
                value: tentitiveGuess,
                key: crypto.randomUUID(),
            },
        ];

        setGuesses(nextGuesses);

        setGameReuslt({
            amountOfGuesses: nextGuesses.length,
            winner: tentitiveGuess.toUpperCase() === answer,
            endGame:
                nextGuesses.length === NUM_OF_GUESSES_ALLOWED ||
                tentitiveGuess.toUpperCase() === answer,
        });
    }

    function handleKeyPressed(tentitiveKey) {
        // if game has ended dont allow input from keyboard
        if (gameResult.endGame) {
            return;
        }

        // set nextKeys to new array of current state
        let nextKeys = [...keyboardInput];

        // Check that back button not pressed
        if (tentitiveKey !== "BACK") {
            nextKeys = [...keyboardInput, tentitiveKey];
        }

        // If submitted add tentitiveGuess to guesses
        if (
            tentitiveKey === "ENTER" &&
            nextKeys.length === NUM_OF_GUESSES_ALLOWED
        ) {
            const tentitiveGuess = [...keyboardInput].join("");
            const nextGuesses = [
                ...guesses,
                {
                    value: tentitiveGuess,
                    key: crypto.randomUUID(),
                },
            ];
            setGuesses(nextGuesses);
            setKeyboardInput("");

            setGameReuslt({
                amountOfGuesses: nextGuesses.length,
                winner: tentitiveGuess.toUpperCase() === answer,
                endGame:
                    nextGuesses.length === NUM_OF_GUESSES_ALLOWED ||
                    tentitiveGuess.toUpperCase() === answer,
            });
        }

        // if back button pressed remove last from array
        if (tentitiveKey === "BACK") {
            let tentitiveKeyboardInput = nextKeys;
            tentitiveKeyboardInput.pop();
        }

        if (
            nextKeys.length < NUM_OF_GUESSES_ALLOWED &&
            tentitiveKey !== "ENTER"
        ) {
            setKeyboardInput(nextKeys);
        }
    }

    function handleRestart() {
        setAnswer(sample(WORDS));
        setKeyboardInput("");
        setGuesses([]);
        setGameReuslt(initialGameResult);
    }

    const validatedGuesses = guesses.map((guess) =>
        checkGuess(guess.value, answer)
    );

    return (
        <>
            <GuessResult
                guesses={guesses}
                answer={answer}
                keyboardInput={keyboardInput}
            />
            <GuessInput
                gameResult={gameResult}
                handleSubmitGuess={handleSubmitGuess}
            />
            {gameResult.winner && (
                <WonBanner
                    amountOfGuesses={gameResult.amountOfGuesses}
                    handleRestart={handleRestart}
                />
            )}
            {gameResult.amountOfGuesses ===
                NUM_OF_GUESSES_ALLOWED && (
                <LostBanner
                    answer={answer}
                    handleRestart={handleRestart}
                />
            )}
            <Keyboard
                validatedGuesses={validatedGuesses}
                handleKeyPressed={handleKeyPressed}
            />
        </>
    );
}

export default Game;
