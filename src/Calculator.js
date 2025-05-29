import React, {useState} from 'react'

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);

    const add = (input) => {
        if (input.trim() === '') return 0;
        const normalized = input.replace(/\\n/g, '\n');
        const numbers = normalized.split(/[\n\r,]+/).map(num => {
            const parsedNum = parseInt(num, 10);
            if (isNaN(parsedNum)) throw new Error('Invalid number');
            return parsedNum;
        });
        return numbers.reduce((acc, item) => acc + item, 0);
    };
    const handleCalculate = ()=> {
        const sum = add(input);
        setResult(sum);
    }

  return (
    <div>
        <h3>Calculator using TDD</h3>
        <textarea 
            placeholder="Enter numbers separated by commas"
            onChange={(e) => setInput(e.target.value)}
            />
        <button onClick={handleCalculate}>Add</button>

        <p>Result: {result}</p>
    </div>
  )
}

export default Calculator