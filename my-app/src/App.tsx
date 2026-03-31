import { useState } from 'react'

export function add(a: number, b: number): number {
  return a + b
}

export function subtract(a: number, b: number): number {
  return a - b
}

export function multiply(a: number, b: number): number {
  return a * b
}

export function divide(a: number, b: number): number | string {
  if (b === 0) return 'Error'
  return a / b
}

function App() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState<number | string>('')

  const handleAdd = () => {
    setResult(add(Number(num1), Number(num2)))
  }

  const handleSubtract = () => {
    setResult(subtract(Number(num1), Number(num2)))
  }

  const handleMultiply = () => {
    setResult(multiply(Number(num1), Number(num2)))
  }

  const handleDivide = () => {
    setResult(divide(Number(num1), Number(num2)))
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
          <button onClick={handleAdd} className="bg-blue-500 text-white py-2 rounded">
            Add
          </button>
          <button onClick={handleSubtract} className="bg-blue-500 text-white py-2 rounded">
            Subtract
          </button>
          <button onClick={handleMultiply} className="bg-blue-500 text-white py-2 rounded">
            Multiply
          </button>
          <button onClick={handleDivide} className="bg-blue-500 text-white py-2 rounded">
            Divide
          </button>
        </div>

        <button onClick={clear} className="w-full mt-3 bg-gray-500 text-white py-2 rounded">
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