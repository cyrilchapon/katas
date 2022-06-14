import { expect } from 'earljs'

import {
  permuteUnique
} from '../../src/47-permutations-unique'

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
}, {
  input: [1, 1, 2],
  expected: [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
}]

describe('47 - Permutations unique', () => {
  describe('isValid', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = permuteUnique(testCase.input)

        expect(result).toBeAnArrayWith(...testCase.expected)
        expect(testCase.expected).toBeAnArrayWith(...result)
        expect(result).toBeAnArrayOfLength(testCase.expected.length)
      })
    })
  })
})
