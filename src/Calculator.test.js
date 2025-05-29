import {describe, expect, it} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import Calculator from './Calculator'

describe('Calculator Component', () => {
    it('Should render without crashing', () => {
        const { getByText } = render(<Calculator />);
        expect(getByText('Calculator using TDD')).toBeInTheDocument();
    });

    it('Should return 0 if input is ""', () => {
        const { getByText, getByPlaceholderText } = render(<Calculator />);
        const input = getByPlaceholderText('Enter numbers separated by commas');
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Result: 0')).toBeInTheDocument();
    });

    it('Should return the element if the input is one number " "', () => {
        const { getByText, getByPlaceholderText } = render(<Calculator />);
        const input = getByPlaceholderText('Enter numbers separated by commas');
        
        fireEvent.change(input, { target: { value: '5' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Result: 5')).toBeInTheDocument();
    });
    
    it('Should add unknown amount of numbers', () => {
        const { getByText, getByPlaceholderText } = render(<Calculator />);
        const input = getByPlaceholderText('Enter numbers separated by commas');
        
        fireEvent.change(input, { target: { value: '1,2' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Result: 3')).toBeInTheDocument();
    });

    it('Should handle new lines between numbers (instead of commas)', () => {
        const { getByText, getByPlaceholderText } = render(<Calculator />);
        const input = getByPlaceholderText('Enter numbers separated by commas');
        
        fireEvent.change(input, { target: { value: '1\n2,3' } });
        fireEvent.click(getByText('Add'));
        expect(getByText('Result: 6')).toBeInTheDocument();
    });
 
});
