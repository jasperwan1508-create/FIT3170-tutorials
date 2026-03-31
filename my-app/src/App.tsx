import { useState } from 'react'
import './App.css'

function App() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState('')

  const add = () => {
    setResult(String(Number(num1) + Number(num2)))
  }

  const subtract = () => {
    setResult(String(Number(num1) - Number(num2)))
  }

  const multiply = () => {
    setResult(String(Number(num1) * Number(num2)))
  }

  const divide = () => {
    if (Number(num2) === 0) {
      setResult('Cannot divide by zero')
    } else {
      setResult(String(Number(num1) / Number(num2)))
    }
  }

  const clear = () => {
    setNum1('')
    setNum2('')
    setResult('')
  }

  return (
    <div className="container">
      <h1>Calculator App</h1>

      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <div className="buttons">
        <button onClick={add}>Add</button>
        <button onClick={subtract}>Subtract</button>
        <button onClick={multiply}>Multiply</button>
        <button onClick={divide}>Divide</button>
      </div>

      <button className="clear-btn" onClick={clear}>
        Clear
      </button>

      <h2>Result: {result}</h2>
    </div>
  )
}

export default App