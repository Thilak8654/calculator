import React, {useState} from 'react'

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);

    const add = (input) => {
        if(input === '') return 0;
        const numbers = input.split(/[\s,]+/).map(num => {
            const parsedNum = parseFloat(num);
            if(isNaN(parsedNum)) throw new Error('Invalid number');
            return parsedNum;
        });
        if(numbers.length === 0) return 0;
        if(numbers.length === 1) return numbers[0];

        return numbers.reduce((acc, curr)=> acc+curr, 0);
    }
    const handleCalculate = ()=> {
        const sum = add(input);
        setResult(sum);
    }

  return (
    <div>
        <h3>Calculator using TDD</h3>
        <input 
            type="text" 
            value={input} 
            placeholder="Enter numbers separated by commas"
            onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleCalculate}>Add</button>
        <p>Result: {result}</p>
    </div>
  )
}

export default Calculator