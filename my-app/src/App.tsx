import { useState } from 'react'
import './App.css'

function App() {
  const [num1, setNum1] = useState<string>('')
  const [num2, setNum2] = useState<string>('')
  const [result, setResult] = useState<string>('0')

  const first = Number(num1)
  const second = Number(num2)

  const add = () => {
    setResult(String(first + second))
  }

  const subtract = () => {
    setResult(String(first - second))
  }

  const multiply = () => {
    setResult(String(first * second))
  }

  const divide = () => {
    if (second === 0) {
      setResult('Cannot divide by zero')
      return
    }
    setResult(String(first / second))
  }

  const clearAll = () => {
    setNum1('')
    setNum2('')
    setResult('0')
  }

  return (
    <div className="app">
      <div className="calculator-card">
        <p className="eyebrow">React + TypeScript</p>
        <h1>Simple Calculator</h1>
        <p className="subtitle">
          Practice state, events, inputs, and reusable UI structure.
        </p>

        <div className="input-group">
          <label htmlFor="num1">First number</label>
          <input
            id="num1"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
          />
        </div>

        <div className="input-group">
          <label htmlFor="num2">Second number</label>
          <input
            id="num2"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>

        <div className="button-grid">
          <button onClick={add}>+</button>
          <button onClick={subtract}>−</button>
          <button onClick={multiply}>×</button>
          <button onClick={divide}>÷</button>
        </div>

        <button className="clear-button" onClick={clearAll}>
          Clear
        </button>

        <div className="result-box">
          <span className="result-label">Result</span>
          <span className="result-value">{result}</span>
        </div>
      </div>
    </div>
  )
}

export default App