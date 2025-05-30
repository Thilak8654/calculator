import { useState } from 'react'

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);

    const add = (input) => {
        if (input.trim() === '') return 0;
        const normalizedString = input.replace(/\\n/g, '\n');
        let numbersString = normalizedString;
        let delimiters = /[\n\r,]+/;

        if (normalizedString.startsWith('//')) {
            const delimiterEndIndex = normalizedString.indexOf('\n');
            if (delimiterEndIndex === -1) throw new Error('Invalid delimiter format');

            const customDelimiter = normalizedString.slice(2, delimiterEndIndex);
            const delimiterPatterns = [];

            const regex = /\[([^\]]+)\]/g;
            let match;
            while ((match = regex.exec(customDelimiter)) !== null) {
                delimiterPatterns.push(match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            }

            if (delimiterPatterns.length === 0) {
                delimiterPatterns.push(customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            }

            delimiters = new RegExp(`(?:${delimiterPatterns.join('|')}|[\n\r])+`);
            numbersString = normalizedString.slice(delimiterEndIndex + 1);
        }

        const numbers = numbersString
            .split(delimiters)
            .map(num => num.trim())
            .filter(num => num.length > 0) // to remove empty strings
            .map(num => {
                const parsedNumber = parseInt(num, 10);
                if (isNaN(parsedNumber)) throw new Error('Invalid number');
                return parsedNumber;
            });

        const negatives = numbers.filter(n => n < 0);
        if (negatives.length > 0) {
            return negatives.join(', ');
        }

        // Ignore numbers > 1000
        const filteredNumbers = numbers.filter(n => n <= 1000);
        return filteredNumbers.reduce((acc, curr) => acc + curr, 0);
    };


    const handleCalculate = () => {
        const sum = add(input);
        setResult(sum);
    }

    return (
        <div className='calc-container'>
            <h3>Calculator using TDD</h3>
            <textarea
                value={input}
                placeholder="Enter numbers separated by commas"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleCalculate}>Add</button>
            <button onClick={() => setInput('')}>Clear</button>
            <p className="result-text">Result: {result}</p>
            <p className="error-message">
                {result < 0 ? `Negatives not allowed: ${result}` : ''}
            </p>
            <p className="error-message">
                {result > 1000 ? 'Numbers greater than 1000 are ignored' : ''}
            </p>
        </div>
    )
}

export default Calculator