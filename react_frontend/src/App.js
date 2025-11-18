import React, { useState } from "react";

// Simple minimalistic calculator app
// Supports addition, subtraction, multiplication, division

// Button component for numbers and operations
const CalcButton = ({ value, onClick, className }) => (
  // PUBLIC_INTERFACE
  <button
    className={`calc-btn ${className || ""}`}
    onClick={() => onClick(value)}
    aria-label={value}
    type="button"
  >
    {value}
  </button>
);

// The display at the top
const Display = ({ value }) => (
  // PUBLIC_INTERFACE
  <div className="calc-display" role="status" aria-live="polite">
    {value}
  </div>
);

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", "C", "=", "+"],
];

// Helper for evaluating simple arithmetic expressions safely
function safeEval(expr) {
  // PUBLIC_INTERFACE
  // Only allow digits, operators, spaces, decimal.
  // No eval, Function or any unsafe operations.
  // We'll parse and run it as a left-to-right calculator.
  try {
    let tokens = expr.replace(/[^0-9\.\+\-\*\/]/g, "").split(/([\+\-\*\/])/).filter(Boolean);
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i], num = parseFloat(tokens[i + 1]);
      if (isNaN(num)) return "Err";
      if (op === "+") result += num;
      else if (op === "-") result -= num;
      else if (op === "*") result *= num;
      else if (op === "/") {
        if (num === 0) return "Err";
        result /= num;
      }
    }
    return String(Number.isFinite(result) ? result : "Err");
  } catch {
    return "Err";
  }
}

export default function App() {
  // The main calculator logic and UI

  const [display, setDisplay] = useState("0");
  const [isResult, setIsResult] = useState(false);

  // PUBLIC_INTERFACE
  const handleButton = value => {
    if (value === "C") {
      setDisplay("0");
      setIsResult(false);
    } else if (value === "=") {
      setDisplay(safeEval(display));
      setIsResult(true);
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Don't allow two operators in a row
      if (/[+\-*/]$/.test(display)) {
        setDisplay(display.replace(/[+\-*/]+$/, value));
      } else {
        setDisplay(display === "0" ? value : display + value);
      }
      setIsResult(false);
    } else if (/^\d$/.test(value)) {
      if (isResult) {
        setDisplay(value);
        setIsResult(false);
      } else if (display === "0") {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    }
  };

  return (
    <div className="calc-root">
      <h1 className="calc-header">Simple Calculator</h1>
      <div className="calc-container">
        <Display value={display} />
        <div className="calc-keypad">
          {buttons.map((row, i) => (
            <div key={i} className="calc-row">
              {row.map(val => (
                <CalcButton
                  key={val}
                  value={val}
                  onClick={handleButton}
                  className={val === "=" ? "equals" : ""}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <footer className="calc-footer">
        Minimal Calculator – React &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
