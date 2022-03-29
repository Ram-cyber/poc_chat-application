import React,{ useEffect } from "react";

import Chat from "./Components/Chat";
import Join from "./Components/Join";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



const App = () => {
  useEffect(() => {
    document.body.style.margin = 0;
  
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);
  return <Router>
    <Routes>
      <Route path="/" exact element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </Router>
};

export default App;
