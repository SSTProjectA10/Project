// Calculator.test.js
const Calculator = require('./Calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('adds two numbers', () => {
        expect(calculator.add(2, 3)).toBe(5);
        expect(calculator.add(-2, 1)).toBe(-1);
    });

    test('subtracts two numbers', () => {
        expect(calculator.subtract(5, 2)).toBe(3);
        expect(calculator.subtract(1, 5)).toBe(-4);
    });

    test('multiplies two numbers', () => {
        expect(calculator.multiply(3, 5)).toBe(15);
        expect(calculator.multiply(2, -3)).toBe(-6);
    });

    test('divides two numbers', () => {
        expect(calculator.divide(10, 5)).toBe(2);
        expect(calculator.divide(9, -3)).toBe(-3);
    });

    test('throws error when dividing by zero', () => {
        expect(() => {
            calculator.divide(10, 0);
        }).toThrow('Cannot divide by zero');
    });
});
