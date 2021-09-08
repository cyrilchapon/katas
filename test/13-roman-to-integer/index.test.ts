import { expect } from 'earljs'

import {
  romanToInt
} from '../../src/13-roman-to-integer'

type TestCase = {
  input: string
  expected: number
}

const testCases: TestCase[] = [{
  input: 'M',
  expected: 1000,
},{
  input: 'MMMMMMMMMMM',
  expected: 11000
}, {
  input: 'III',
  expected: 3
}, {
  input: 'IV',
  expected: 4
}, {
  input: 'IX',
  expected: 9
}, {
  input: 'LVIII',
  expected: 58
  // Explanation: L = 50, V = 5, III = 3.
}, {
  input: 'MCMXCIV',
  expected: 1994
  // Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
}, {
  input: 'DCXXI',
  expected: 621
}]

describe('13. Roman To Integer', () => {
  describe('romanToInt', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = romanToInt(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
