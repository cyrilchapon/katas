import { expect } from 'earljs'

import {
  uniquePaths
} from '../../src/62-unique-paths'

type TestCase = {
  input: [number, number]
  expected: number
}

const testCases: TestCase[] = [{
  input: [3, 2],
  expected: 3
}, {
  input: [3, 7],
  expected: 28
}, {
  input: [7, 3],
  expected: 28
}, {
  input: [3, 3],
  expected: 6
}, {
  input: [23, 12],
  expected: 193536720
}]

describe('62 - Find unique paths', () => {
  describe('uniquePaths', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = uniquePaths(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
