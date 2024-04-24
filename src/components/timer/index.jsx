import { useEffect } from "react";

export default function Timer({ dispatch }) {
    useEffect(
        function () {
            setInterval(function () {
                dispatch({ type: "tick" });
            }, 1000);
        },
        [dispatch]
    );
    return <div className="timer">05:00</div>;
}
