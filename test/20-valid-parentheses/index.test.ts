import { expect } from 'earljs'

import {
  isValid
} from '../../src/20-valid-parentheses'

type TestCase = {
  input: string
  expected: boolean
}

const testCases: TestCase[] = [{
  input: '[]',
  expected: true
}, {
  input: '{}',
  expected: true
}, {
  input: '()',
  expected: true
}, {
  input: '[',
  expected: false
}, {
  input: ')',
  expected: false
}, {
  input: '([])',
  expected: true
}, {
  input: '([]){',
  expected: false
}, {
  input: 'a',
  expected: false
}, {
  input: '(a)',
  expected: false
}]

describe('20 - Valid parentheses', () => {
  describe('isValid', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = isValid(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
