import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import expectedFunctionalRequirements from "./dummyFunctionalRequirements";
import expectedNonFunctionalRequirements from "./dummyNonFunctionalRequirements";


function RequirementsPage() {
  const location = useLocation();
  const question = location.state?.question;
  const [requirements, setRequirements] = useState("");
  const [nonFunctional, setNonFunctional] = useState("");
  const [result, setResult] = useState(null);
  const [missingNonFunctional, setMissingNonFunctional] = useState(null);
  console.log("question is", question);  debugger;

  const handleValidate = () => {
    // User input → trim spaces, remove blanks, lowercase
    const userReqs = requirements
      .split("\n")
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const userNonFunctional = nonFunctional
      .split("\n")
      .map(r => r.trim().toLowerCase())
      .filter(r => r.length > 0);

    // Expected requirements (keep original casing for display)
    const expectedOriginal = expectedFunctionalRequirements[question] || [];
    const expectedNonFunctionalOriginal = expectedNonFunctionalRequirements[question] || [];


    // Lowercase arrays for comparison
    const userLower = userReqs.map(r => r.toLowerCase());
    const expectedLower = expectedOriginal.map(e => e.toLowerCase());
    const userNonFunctionalLower = userNonFunctional.map(r => r.toLowerCase());
    const expectedNonFunctionalLower = expectedNonFunctionalOriginal.map(e => e.toLowerCase());

    // Find missing (use original text for display)
    const missing = expectedOriginal.filter(
      (exp, i) => !userLower.includes(expectedLower[i])
    );

    // Find matched (use original text for display)
    const matched = expectedOriginal.filter(
      (exp, i) => userLower.includes(expectedLower[i])
    );

    const missingNonFunctionalList = expectedNonFunctionalOriginal.filter(
      (exp, i) => !userNonFunctionalLower.includes(expectedNonFunctionalLower[i])
    );

    const matchedNonFunctionalList = expectedNonFunctionalOriginal.filter(
      (exp, i) => userNonFunctionalLower.includes(expectedNonFunctionalLower[i])
    );

    setResult({ matched, missing, userReqs });
    setMissingNonFunctional({
        matchedNonFunctional: matchedNonFunctionalList,
        missingNonFunctional: missingNonFunctionalList,
        userNonFunctional
        });
  };

  return (
    <div className="card">
      <h2 style={{ color: "#34495e" }}>Enter Requirements for:</h2>
      <h3 style={{ color: "#8e44ad" }}>{question}</h3>
      <textarea
        value={requirements}
        placeholder="Enter one requirement per line"
        onChange={e => setRequirements(e.target.value)}
        style={{
            width: "100%",        // full width of the card/container
            minHeight: "200px",   // taller box
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "vertical"    // allow user to drag to resize vertically
        }}
        />
      <br />
      {/* Non-Functional Requirements */}
      <h3 style={{ color: "#34495e" }}>Non-Functional Requirements</h3>
      <textarea
        value={nonFunctional}
        placeholder="Enter one non-functional requirement per line"
        onChange={e => setNonFunctional(e.target.value)}
        style={{
          width: "100%",
          minHeight: "150px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
          marginBottom: "20px"
        }}
      />
        <br />

      <button onClick={handleValidate}>Validate</button>

      {result && (
        <div className="results" style={{ textAlign: "left", marginTop: "20px" }}>
          <h4>Matched Functional Requirements:</h4>
          <ul>{result.matched.map((m, idx) => <li key={idx} className="matched">{m}</li>)}</ul>

          <h4>Missing Functional Requirements:</h4>
          <ul>{result.missing.map((m, idx) => <li key={idx} className="missing">{m}</li>)}</ul>
        </div>
      )}

      {missingNonFunctional && (
        <div className="results" style={{ textAlign: "left", marginTop: "20px" }}>
          <h4>Matched Non Functional Requirements:</h4>
          <ul>{missingNonFunctional.matchedNonFunctional.map((m, idx) => <li key={idx}>{m}</li>)}</ul>

          <h4>Missing Non Functional Requirements:</h4>
          <ul>{missingNonFunctional.missingNonFunctional.map((m, idx) => <li key={idx}>{m}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default RequirementsPage;
