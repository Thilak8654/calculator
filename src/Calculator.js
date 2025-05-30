import React, { useState } from 'react'

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);
    const add = (input) => {
        if (input.trim() === '') return 0;

        // Normalize literal \n to actual newlines
        const normalized = input.replace(/\\n/g, '\n');
        let numbersString = normalized;
        let delimiters = /[\n\r,]+/;

        // Handle custom delimiter format
        if (normalized.startsWith('//')) {
            const delimiterEndIndex = normalized.indexOf('\n');
            if (delimiterEndIndex === -1) throw new Error('Invalid delimiter format');

            // Extract delimiter and escape regex characters
            const customDelimiter = normalized
                .slice(2, delimiterEndIndex)
                .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            delimiters = new RegExp(`[${customDelimiter}\\n\\r]+`); // Include newlines as fallback
            numbersString = normalized.slice(delimiterEndIndex + 1);
        }

        const numbers = numbersString.split(delimiters).map(num => {
            const parsed = parseInt(num.trim(), 10);
            if (isNaN(parsed)) throw new Error('Invalid number');
            return parsed;
        });

        return numbers.reduce((acc, curr) => acc + curr, 0);
    };


    const handleCalculate = () => {
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