export default function Option({ question, answer, dispatch }) {
    return (
        <div>
            <div className="options">
                {question.options.map((option) => (
                    <button className="btn btn-option" key={option}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
