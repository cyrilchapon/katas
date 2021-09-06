import { expect } from 'earljs'

import { mergeSorted } from '../../src/4-median-2-sorted-arrays'

type TestCase = {
  input: [number[], number[]]
  expected: number[]
}

const testCases: TestCase[] = [{
  input: [[1, 3], [2, 4]],
  expected: [1, 2, 3, 4]
}, {
  input: [[1, 3, 3], [2, 4]],
  expected: [1, 2, 3, 3, 4]
}, {
  input: [[], [2, 4]],
  expected: [2, 4]
}, {
  input: [[1, 3], []],
  expected: [1, 3]
}, {
  input: [[1, 3], [4]],
  expected: [1, 3, 4]
}, {
  input: [[1, 3], [0]],
  expected: [0, 1, 3]
}, {
  input: [[1, 3], [2, 2, 2, 2, 10]],
  expected: [1, 2, 2, 2, 2, 3, 10]
}]

describe('4 - Median of 2 sorted Arrays', () => {
  describe('mergeSorted', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should concat test case ${testCaseIndex}`, () => {
        const result = mergeSorted(...testCase.input)
        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
