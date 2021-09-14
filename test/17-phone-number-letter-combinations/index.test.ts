import { expect } from 'earljs'

import {
  letterCombinations
} from '../../src/17-phone-number-letter-combinations'

type TestCase = {
  input: string
  expected: string[]
}

const testCases: TestCase[] = [{
  input: '23',
  expected: ['ad','ae','af','bd','be','bf','cd','ce','cf']
}, {
  input: '',
  expected: []
}, {
  input: '2',
  expected: ['a','b','c']
}]

describe('17. Letter Combinations of a Phone Number', () => {
  describe('letterCombinations', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = letterCombinations(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
