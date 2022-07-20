import React  from "react";
import "./App.css";
import Buttons from "./components/Buttons/Buttons";
import Users from "./components/Users/UsersComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Buttons />
        <p>{process.env.REACT_APP_BASE_URL}</p>
      </header>
      <Users />
    </div>
  );
}

export default App;
