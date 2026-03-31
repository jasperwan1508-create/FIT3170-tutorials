import { useState } from 'react'

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-80 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Calculator App
        </h1>

        <input
          type="number"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />

        <input
          type="number"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={add}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>

          <button
            onClick={subtract}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Subtract
          </button>

          <button
            onClick={multiply}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Multiply
          </button>

          <button
            onClick={divide}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Divide
          </button>
        </div>

        <button
          onClick={clear}
          className="w-full mt-3 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Clear
        </button>

        <h2 className="text-green-600 font-semibold text-center mt-4">
          Result: {result}
        </h2>
      </div>
    </div>
  )
}

export default App