// import DateCounter from "./components/dateCounter/dateCounter";
import { useEffect, useReducer } from "react";
import Header from "./components/header/header";
import Main from "./components/main";
import Loader from "./components/loader";
import Error from "./components/error/error";
import StartScreen from "./components/startScreen/startScreen";
import Question from "./components/questions/Question";
import NextButton from "./components/nextButton";
import Progress from "./components/progress";
import FinishScreen from "./components/finishScreen";
import Footer from "./components/footer";
import Timer from "./components/timer";

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    // "loading, "error", "ready", "active", "finished"
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
};
function reducer(state, action) {
    switch (action.type) {
        // Case for when data is successfully received from the API
        case "dataReceived":
            // Return a new state object with updated questions and status
            return {
                ...state, // Spread operator to copy current state
                questions: action.payload, // Update questions with received data
                status: "ready", // Set status to "ready" indicating successful data retrieval
            };
        // Case for when data retrieval from the API fails
        case "dataFailed":
            // Return a new state object with updated status indicating error
            return {
                ...state, // Spread operator to copy current state
                status: "error", // Set status to "error" indicating data retrieval failure
            };
        case "start":
            return {
                ...state,
                status: "active",
                // Gives you 30 seconds per question and calculates based on the amount of questions
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case "newAnswer":
            //extract the current question from the state based on the current index
            const question = state.questions.at(state.index);
            //Calculate the new points based on the provided answer and the correct option of the question
            //If the provided answer matches the correct option, increment the points by 10; otherwise, keep the points unchanged
            return {
                ...state, // spread operator to copy the current state
                answer: action.payload, // update the answer with the payload (newly provided answer)
                points:
                    action.payload === question.correctOption // Check if the provided answer matches the cprrect option of the question
                        ? state.points + question.points //increment points by the value assigned to question (in the "API") if the answer is correct
                        : state.points, // Keep points unchanged if the answer is incorrect
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return {
                ...state,
                status: "finished",
                // If points is greater than highScore, update the state so value is changed.
                highScore:
                    state.points > state.highScore
                        ? state.points
                        : state.highScore,
            };
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };

        // Subtract 1 second, every second
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
            };
        // Default case for handling unknown actions
        default:
            // Throw an error since the action type is not recognized
            throw new Error("action unknown");
    }
}

function App() {
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highScore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);
    // Effect hook to fetch data from the API when the component mounts

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + cur.points,
        0
    );

    useEffect(function () {
        fetch("http://localhost:8000/questions") // Get information from the fake API
            .then((res) => res.json()) // Convert the response to JSON format
            .then((data) => dispatch({ type: "dataReceived", payload: data })) // Dispatch action for successful data retrieval
            .catch((err) => dispatch({ type: "dataFailed" })); // Dispatch action for data retrieval failure
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts
    return (
        <div className="app">
            <Header />
            {/* <DateCounter /> */}
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        dispatch={dispatch}
                        numQuestions={numQuestions}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            numQuestions={numQuestions}
                            index={index}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Question
                            dispatch={dispatch}
                            answer={answer}
                            question={questions[index]}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                numQuestions={numQuestions}
                                index={index}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        dispatch={dispatch}
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highScore={highScore}
                    />
                )}
            </Main>
        </div>
    );
}

export default App;
