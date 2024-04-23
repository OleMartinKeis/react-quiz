export default function Option({ question, answer, dispatch }) {
    const hasAnswered = answer !== null;

    return (
        <div>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        className={`btn btn-option ${
                            index === answer ? "answer" : ""
                        } ${
                            hasAnswered
                                ? index === question.correctOption
                                    ? "correct"
                                    : "wrong"
                                : ""
                        }`}
                        key={option}
                        disabled={hasAnswered}
                        onClick={() =>
                            dispatch({ type: "newAnswer", payload: index })
                        }
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
