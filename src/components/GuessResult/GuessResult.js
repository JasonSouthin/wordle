import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { updateKeys } from "../../game-helpers";

function GuessResult({ guesses, answer, keyboardInput }) {
    const updatedKeyboardInput = updateKeys(guesses, keyboardInput);
    return (
        <div className="guess-results-wrapper">
            <div className="guess-results">
                {range(NUM_OF_GUESSES_ALLOWED).map((num) => {
                    return (
                        <Guess
                            key={num}
                            value={guesses[num]?.value}
                            answer={answer}
                            keyboardInput={updatedKeyboardInput[num]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default GuessResult;
