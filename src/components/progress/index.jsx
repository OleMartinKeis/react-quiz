export default function Progress({
    index,
    numQuestions,
    points,
    maxPossiblePoints,
    answer,
}) {
    return (
        <header className="progress">
            {/*If there is no answer  this returns false*/}
            <progress
                max={numQuestions}
                value={index + Number(answer !== null)}
            ></progress>
            <p>
                Question <strong>{index + 1}</strong> / {numQuestions}
            </p>
            <p></p>
            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    );
}
