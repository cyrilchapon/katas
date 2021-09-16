import { expect } from 'earljs'

import {
  maxArea
} from '../../src/11-max-area'

type TestCase = {
  input: number[]
  expected: number
}

const testCases: TestCase[] = [{
  input: [1,8,6,2,5,4,8,3,7],
  expected: 49
}, {
  input: [1,1],
  expected: 1
}, {
  input: [4,3,2,1,4],
  expected: 16
}, {
  input: [1,2,1],
  expected: 2
}]

describe('11 - Container With Most Water', () => {
  describe('maxArea', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = maxArea(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
