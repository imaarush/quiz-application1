import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-2" style={{ padding: "40px 0" }}>
      <div style={{
        background: "white",
        borderRadius: "var(--radius-lg)",
        padding: "32px 40px",
        maxWidth: 600,
        width: "100%",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--gray-200)"
      }}>
        <div className="flex items-center gap-1" style={{ marginBottom: 20 }}>
          <i className="ri-information-line" style={{ fontSize: 24, color: "var(--primary)" }}></i>
          <h1 className="text-xl">Instructions</h1>
        </div>
        <ul style={{
          display: "flex", flexDirection: "column", gap: 12,
          paddingLeft: 20, color: "var(--gray-600)", lineHeight: 1.6
        }}>
          <li>Exam must be completed in <strong>{examData.duration} seconds</strong>.</li>
          <li>Exam will be submitted automatically after {examData.duration} seconds.</li>
          <li>Once submitted, you cannot change your answers.</li>
          <li>Do not refresh the page.</li>
          <li>
            Use the <strong>"Previous"</strong> and <strong>"Next"</strong> buttons to navigate between questions.
          </li>
          <li>Total marks: <strong>{examData.totalMarks}</strong></li>
          <li>Passing marks: <strong>{examData.passingMarks}</strong></li>
        </ul>
      </div>

      <div className="flex gap-2" style={{ marginTop: 16 }}>
        <button className="primary-outlined-btn" onClick={() => navigate("/")}>
          <i className="ri-arrow-left-line"></i>
          Go Back
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          <i className="ri-play-circle-line"></i>
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default Instructions;
