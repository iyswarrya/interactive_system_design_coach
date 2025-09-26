import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionsPage from "./QuestionsPage";
import RequirementsPage from "./RequirementsPage";

function App() {
  return (
    <Router>
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Interactive System Design Coach</h1>
      <Routes>
        <Route path="/" element={<QuestionsPage />} />
        <Route path="/requirements" element={<RequirementsPage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;




