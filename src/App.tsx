import { useState } from "react";
import AppRouter from "./app_router";
import "./App.scss";

function App() {
  return (
    <>
      <div className="app">
        <AppRouter />
      </div>
    </>
  );
}

export default App;
