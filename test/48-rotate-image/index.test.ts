import { expect } from 'earljs'

import {
  rotateImage,
  _printMatrix
} from '../../src/48-rotate-image'

type TestCase = {
  input: number[][]
  expected: number[][]
}

const testCases: TestCase[] = [{
  input: [[1, 2], [300, 400]],
  expected: [[300, 1], [400, 2]]
}, {
  input: [[1, 3, 4], [7, 3, 8], [2, 5, 4]],
  expected: [[2, 7, 1], [5, 3, 3], [4, 8, 4]]
}]

describe('48 - Rotate Image', () => {
  describe('rotateImage', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        _printMatrix(testCase.input)
        _printMatrix(testCase.expected)
        const result = rotateImage(testCase.input)
        _printMatrix(result)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
