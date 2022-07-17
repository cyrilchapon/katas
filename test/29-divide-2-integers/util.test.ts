import { expect } from 'earljs'

import {
  hardIsNegative,
  xor,
  isNegativeProduct,
  getProductSign
} from '../../src/29-divide-2-integers'

describe('29 - Divide 2 integers', () => {
  describe('hardIsNegative()', () => {
    const testCases = [
      { input: 1, expected: false },
      { input: 10, expected: false },
      { input: 0, expected: false },
      { input: -1, expected: true },
      { input: -10, expected: true },
      { input: -0, expected: true }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = hardIsNegative(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
  describe('xor()', () => {
    const testCases: { input: [boolean, boolean], expected: boolean }[] = [
      { input: [true, true], expected: false },
      { input: [false, false], expected: false },
      { input: [true, false], expected: true },
      { input: [false, true], expected: true }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = xor(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
  describe('isNegativeProduct()', () => {
    const testCases: { input: [number, number], expected: boolean }[] = [
      { input: [1, 1], expected: false },
      { input: [2, 10], expected: false },
      { input: [0, 20], expected: false },
      { input: [10, 0], expected: false },
      { input: [-1, -1], expected: false },
      { input: [-2, -10], expected: false },
      { input: [-0, -20], expected: false },
      { input: [-10, -0], expected: false },
      { input: [-1, 1], expected: true },
      { input: [-2, 10], expected: true },
      { input: [-0, 20], expected: true },
      { input: [-10, 0], expected: true },
      { input: [1, -1], expected: true },
      { input: [2, -10], expected: true },
      { input: [0, -20], expected: true },
      { input: [10, -0], expected: true }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = isNegativeProduct(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
  describe('getProductSign()', () => {
    const testCases: { input: [number, number], expected: number }[] = [
      { input: [1, 1], expected: 1 },
      { input: [2, 10], expected: 1 },
      { input: [0, 20], expected: 1 },
      { input: [10, 0], expected: 1 },
      { input: [-1, -1], expected: 1 },
      { input: [-2, -10], expected: 1 },
      { input: [-0, -20], expected: 1 },
      { input: [-10, -0], expected: 1 },
      { input: [-1, 1], expected: -1 },
      { input: [-2, 10], expected: -1 },
      { input: [-0, 20], expected: -1 },
      { input: [-10, 0], expected: -1 },
      { input: [1, -1], expected: -1 },
      { input: [2, -10], expected: -1 },
      { input: [0, -20], expected: -1 },
      { input: [10, -0], expected: -1 }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = getProductSign(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
