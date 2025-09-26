import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  "Design a chat application",
  "Design an online bookstore"
];

function QuestionsPage() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Before Selected Question:", selectedQuestion);
    if (selectedQuestion) {
      console.log("After Selected Question:", selectedQuestion);
      navigate("/requirements", { state: { question: selectedQuestion } });
    } else {
      alert("Please select a question first!");
    }
  };

  return (
    <div className="card">
      <h2 style={{ color: "#34495e" }}>Select a Design Question</h2>
      <select value={selectedQuestion} onChange={e => setSelectedQuestion(e.target.value)}>
        <option value="">-- Select a question --</option>
        {questions.map((q, idx) => (
          <option key={idx} value={q}>{q}</option>
        ))}
      </select>
      <br /><br />
      {/* ✅ Added onClick here */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuestionsPage;
