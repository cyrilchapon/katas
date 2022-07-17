import { expect } from 'earljs'

import {
  divide
} from '../../src/29-divide-2-integers'

type TestCase = {
  input: [number, number]
  expected: number
}

const testCases: TestCase[] = [{
  input: [10, 3],
  expected: 3
}, {
  input: [7, -3],
  expected: -2
}, {
  input: [-2147483648, -1],
  expected: 2147483647
}]

describe('29 - Divide 2 integers', () => {
  describe('divide()', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = divide(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
