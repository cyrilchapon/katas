import { expect } from 'earljs'

import {
  intToRoman
} from '../../src/12-integer-to-roman'

type TestCase = {
  input: number
  expected: string
}

const testCases: TestCase[] = [{
  input: 1000,
  expected: 'M'
},{
  input: 11000,
  expected: 'MMMMMMMMMMM'
}, {
  input: 3,
  expected: 'III'
}, {
  input: 4,
  expected: 'IV'
}, {
  input: 9,
  expected: 'IX'
}, {
  input: 58,
  expected: 'LVIII'
  // Explanation: L = 50, V = 5, III = 3.
}, {
  input: 1994,
  expected: 'MCMXCIV'
  // Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
}]

describe('12. Integer To Roman', () => {
  describe('intToRoman', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = intToRoman(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
