import { expect } from 'earljs'

import {
  squareIsWhite
} from '../../src/1812-color-chessboard-square'

import { testCases } from './test-cases'

describe('1812 - Color of a chessboard square', () => {
  describe('squareIsWhite()', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, function() {
        const result = squareIsWhite(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
