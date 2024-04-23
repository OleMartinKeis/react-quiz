export default function FinishScreen({ maxPossiblePoints, points }) {
    // Finds the percentage of how many points you have scored
    const percentage = (points / maxPossiblePoints) * 100;
    return (
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPossiblePoints} (
            {Math.ceil(percentage)}%)
        </p>
    );
}
