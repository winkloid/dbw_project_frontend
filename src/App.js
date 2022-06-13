import './App.css';
import {Outlet} from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App container-fluid">
      <Outlet />
    </div>
  );
}

export default App;
