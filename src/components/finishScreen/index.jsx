import React from "react";

export default function FinishScreen({ maxPossiblePoints, points }) {
    return (
        <p>
            You scored <strong>{points}</strong> of {maxPossiblePoints}
        </p>
    );
}
