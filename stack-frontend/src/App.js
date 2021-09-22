import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes";
import BodyContainer from "./BodyContainer";

function App() {
  return (
    <div>
      <BodyContainer>
        <Routes />
      </BodyContainer>
    </div>
  );
}

export default App;
