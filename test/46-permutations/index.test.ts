import { expect } from 'earljs'

import {
  permute
} from '../../src/46-permutations'

type TestCase = {
  input: number[]
  expected: number[][]
}

const testCases: TestCase[] = [{
  input: [0, 1],
  expected: [[0, 1], [1, 0]]
}, {
  input: [0, 1, 2],
  expected: [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
}]

describe('46 - Permutations', () => {
  describe('isValid', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = permute(testCase.input)

        expect(result).toBeAnArrayWith(...testCase.expected)
        expect(testCase.expected).toBeAnArrayWith(...result)
        expect(result).toBeAnArrayOfLength(testCase.expected.length)
      })
    })
  })
})
