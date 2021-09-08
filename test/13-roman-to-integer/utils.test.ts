import { expect } from 'earljs'

import {
  splitRomanParts,
  RomanParts,
  PARSE_REGEX
} from '../../src/13-roman-to-integer'

type TestCase = {
  input: string
  expected: RomanParts
}

const testCases: TestCase[] = [{
  input: 'M',
  expected: { M: 'M', C: '', X: '', I: '' }
},{
  input: 'MMMMMMMMMMM',
  expected: { M: 'MMMMMMMMMMM', C: '', X: '', I: '' }
}, {
  input: 'III',
  expected: { M: '', C: '', X: '', I: 'III' }
}, {
  input: 'IV',
  expected: { M: '', C: '', X: '', I: 'IV' }
}, {
  input: 'IX',
  expected: { M: '', C: '', X: '', I: 'IX' }
}, {
  input: 'LVIII',
  expected: { M: '', C: '', X: 'L', I: 'VIII' }
  // Explanation: L = 50, V = 5, III = 3.
}, {
  input: 'LXXX',
  expected: { M: '', C: '', X: 'LXXX', I: '' }
  // Explanation: L = 50, V = 5, III = 3.
}, {
  input: 'MCMXCIV',
  expected: { M: 'M', C: 'CM', X: 'XC', I: 'IV' }
  // Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
}]

describe('13. Roman To Integer', () => {
  describe('splitRomanParts', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = splitRomanParts(PARSE_REGEX)(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
