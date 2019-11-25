import React from "react";
import "./App.css";
// import TopBar from "./topBar";
import NaviLeft from "./nav";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NaviLeft />
      </div>
    </BrowserRouter>
  );
}

export default App;
