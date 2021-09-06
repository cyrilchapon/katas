import { expect } from 'earljs'

import { getMedian } from '../../src/4-median-2-sorted-arrays'

type TestCase = {
  input: number[]
  expected: number
}

const testCases: TestCase[] = [{
  input: [1, 2, 3, 4],
  expected: 2.5
}, {
  input: [1, 2, 3, 3, 4],
  expected: 3
}, {
  input: [2, 4],
  expected: 3
}, {
  input: [1, 3],
  expected: 2
}, {
  input: [1, 3, 4],
  expected: 3
}, {
  input: [0, 1, 3],
  expected: 1
}, {
  input: [1, 2, 2, 2, 2, 3, 10],
  expected: 2
}, {
  input: [],
  expected: 0
}, {
  input: [20],
  expected: 20
}]

describe('4 - Median of 2 sorted Arrays', () => {
  describe('getMedian', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should get median test case ${testCaseIndex}`, () => {
        const result = getMedian(testCase.input)
        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
