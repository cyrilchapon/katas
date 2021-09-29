import { expect } from 'earljs'

import {
  _checkMatrix
} from '../../src/48-rotate-image'

type TestCase = {
  input: number[][]
  expected: boolean
}

const testCases: TestCase[] = [{
  input: [[1]],
  expected: true
}, {
  input: [],
  expected: true
}, {
  input: [[1, 2]],
  expected: false
}, {
  input: [[1, 4], [1, 2]],
  expected: true
}, {
  input: [[1, 4], [1, 2], [1, 2]],
  expected: false
}, {
  input: [[1, 4], [1, 2, 3]],
  expected: false
}]

describe('48 - Rotate Image', () => {
  describe('_checkMatrix', () => {
    testCases.forEach((testCase) => {
      it(`should ${testCase.expected ? '' : 'not '}throw for ${JSON.stringify(testCase.input)}`, () => {
        if (testCase.expected) {
          _checkMatrix(testCase.input)
        } else {
          expect(_checkMatrix.bind(null, testCase.input)).toThrow()
        }
      })
    })
  })
})
