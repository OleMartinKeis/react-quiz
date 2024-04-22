// import DateCounter from "./components/dateCounter/dateCounter";
import { useEffect, useReducer } from "react";
import Header from "./components/header/header";
import Main from "./components/main";
import Loader from "./components/loader";
import Error from "./components/error/error";

const initialState = {
    questions: [],
    // "loading, "error", "ready", "active", "finished"
    status: "loading",
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
        // Default case for handling unknown actions
        default:
            // Throw an error since the action type is not recognized
            throw new Error("action unknown");
    }
}

function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
    // Effect hook to fetch data from the API when the component mounts
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
            </Main>
        </div>
    );
}

export default App;
