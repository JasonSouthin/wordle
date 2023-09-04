import React from "react";

import Banner from "../Banner/Banner";

function WonBanner({ amountOfGuesses, handleRestart }) {
    return (
        <Banner
            status={"happy"}
            action={handleRestart}
            actionText="Restart the game!">
            <p>
                <strong>Congratulations!</strong> Got it in{" "}
                <strong>
                    {amountOfGuesses === 1
                        ? "1 guess"
                        : `${amountOfGuesses} guesses`}
                </strong>
                .
            </p>
        </Banner>
    );
}

export default WonBanner;
