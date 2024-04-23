export default function Progress({ index, numQuestions }) {
    return (
        <header className="progress">
            <p>
                Question <strong>{index}</strong> / {numQuestions}
            </p>
            <p></p>
            <p></p>
        </header>
    );
}
