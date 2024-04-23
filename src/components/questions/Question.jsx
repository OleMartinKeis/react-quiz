import Option from "./option";

export default function Question({ question, answer, dispatch }) {
    return (
        <div>
            <h4>{question.question}</h4>

            <Option question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}
