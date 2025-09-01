import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const questions = [
  {
    question: "What is IncoNetwork primarily focused on",
    options: ["Scalability", "Privacy", "Staking rewards", "Gaming"],
    answer: "Privacy",
    explanation: "IncoNetwork focuses on privacy in Web3 through FHE and encrypted balances"
  },
  {
    question: "What does FHE stand for in IncoNetwork",
    options: ["Fast Hash Encryption", "Fully Homomorphic Encryption", "Functional Hybrid Economy", "Full Hyper Execution"],
    answer: "Fully Homomorphic Encryption",
    explanation: "FHE allows computation on encrypted data without decryption ensuring confidentiality"
  }
];

function App() {
  const [step, setStep] = useState("home");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (option) => {
    const correct = option === questions[current].answer;
    if (correct) setScore(score + 1);
    setAnswers([...answers, { ...questions[current], selected: option }]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setStep("results");
    }
  };

  if (step === "home") {
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Welcome to the IncoNetwork Quiz</h1>
        <p>Test your knowledge of privacy in Web3 and IncoNetwork</p>
        <button onClick={() => setStep("quiz")}>Start the Quiz</button>
      </div>
    );
  }

  if (step === "quiz") {
    const q = questions[current];
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2>Question {current + 1} of {questions.length}</h2>
        <p>{q.question}</p>
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            style={{ display: "block", margin: "0.5rem 0" }}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (step === "results") {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>You scored {score}/{questions.length}</h1>
        <h2>Review Answers</h2>
        {answers.map((a, idx) => (
          <div key={idx} style={{ marginBottom: "1rem" }}>
            <p><strong>Q:</strong> {a.question}</p>
            <p><strong>Your Answer:</strong> {a.selected}</p>
            <p><strong>Correct Answer:</strong> {a.answer}</p>
            <p><em>{a.explanation}</em></p>
          </div>
        ))}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
