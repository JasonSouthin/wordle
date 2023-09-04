import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function GuessInput({ handleSubmitGuess, gameResult }) {
    const [tentitveGuess, setTentitiveGuess] = React.useState("");

    function handleOnSubmit(event) {
        event.preventDefault();
        handleSubmitGuess(tentitveGuess);
        setTentitiveGuess("");
    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className="guess-input-wrapper">
            <label
                className="guess-input-label"
                htmlFor="guess-input">
                Enter Guess:
            </label>
            <input
                value={tentitveGuess}
                id="guess-input"
                minLength={5}
                maxLength={5}
                type="text"
                pattern=".{5,}"
                disabled={gameResult.endGame}
                title="requires 5 charaters"
                required
                onChange={(event) => {
                    const nextGuess =
                        event.target.value.toUpperCase();
                    setTentitiveGuess(nextGuess);
                }}></input>
        </form>
    );
}

export default GuessInput;
