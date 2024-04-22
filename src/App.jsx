// import DateCounter from "./components/dateCounter/dateCounter";
import Header from "./components/header/header";
import Main from "./components/main";

function App() {
    return (
        <div className="app">
            <Header />
            {/* <DateCounter /> */}
            <Main>
                <p>1/15</p>
                <p>Question</p>
            </Main>
        </div>
    );
}

export default App;
