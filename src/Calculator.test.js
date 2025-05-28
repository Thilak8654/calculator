import {describe, expect, it} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import Calculator from './Calculator'

describe('Calculator Component', () => {
    it('should render without crashing', () => {
        const { getByText } = render(<Calculator />);
        expect(getByText('Calculator using TDD')).toBeInTheDocument();
    });

    it('should return 0 if input is ""', () => {
        const { getByText, getByPlaceholderText } = render(<Calculator />);
        const input = getByPlaceholderText('Enter numbers separated by commas');
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Result: 0')).toBeInTheDocument();
    });
    
    it('Should add unknown amount of numbers', () => {
        const { getByText, getByPlaceholderText } = render(<Calculator />);
        const input = getByPlaceholderText('Enter numbers separated by commas');
        
        fireEvent.change(input, { target: { value: '1,2' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Result: 3')).toBeInTheDocument();
    });

 
});
