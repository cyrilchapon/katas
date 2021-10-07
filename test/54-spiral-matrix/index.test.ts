import { expect } from 'earljs'

import {
  spiralOrder,
  _printMatrix
} from '../../src/54-spiral-matrix'

type TestCase = {
  input: number[][]
  expected: number[]
}

const testCases: TestCase[] = [{
  input: [[1,2,3],[4,5,6],[7,8,9]],
  expected: [1,2,3,6,9,8,7,4,5]
}, {
  input: [[1,2,3,4],[5,6,7,8],[9,10,11,12]],
  expected: [1,2,3,4,8,12,11,10,9,5,6,7]
}]

describe('48 - Rotate Image', () => {
  describe('rotateImage', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        _printMatrix(testCase.input)
        console.log(JSON.stringify(testCase.expected))
        const result = spiralOrder(testCase.input)
        console.log(JSON.stringify(result))

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
