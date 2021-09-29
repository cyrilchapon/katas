import { expect } from 'earljs'

import {
  firstMissingPositive
} from '../../src/41-first-missing-integer'

type TestCase = {
  input: number[]
  expected: number
}

const testCases: TestCase[] = [{
  input: [1,2,0],
  expected: 3
}, {
  input: [3,4,-1,1],
  expected: 2
}, {
  input: [7,8,9,11,12],
  expected: 1
}]

describe('41 - First missing integer', () => {
  describe('firstMissingPositive', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = firstMissingPositive(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
