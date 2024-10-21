// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 1, b: 2, action: '', expected: null },
    { a: '', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(action, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
