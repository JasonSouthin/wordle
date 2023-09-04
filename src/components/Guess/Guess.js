import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Cell({ letter, status }) {
    const className = `cell ${status ? status : ""}`;
    return <span className={className}>{letter}</span>;
}

function Guess({ value, answer, keyboardInput }) {
    const result = checkGuess(value, answer);

    return (
        <p className="guess">
            {range(5).map((num) => (
                <Cell
                    key={num}
                    letter={
                        result
                            ? result[num].letter
                            : keyboardInput
                            ? keyboardInput[num]?.letter
                            : undefined
                    }
                    status={
                        result
                            ? result[num].status
                            : keyboardInput
                            ? keyboardInput[num]?.letter
                            : undefined
                    }
                />
            ))}
        </p>
    );
}

export default Guess;
