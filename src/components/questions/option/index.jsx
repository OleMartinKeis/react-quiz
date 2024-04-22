export default function Option({ question, answer, dispatch }) {
    return (
        <div>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        className={`btn btn-option ${
                            index === answer ? "answer" : ""
                        } ${
                            index === question.correctOption
                                ? "correct"
                                : "wrong"
                        }`}
                        key={option}
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
