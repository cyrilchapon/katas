import { expect } from 'earljs'

import {
  myPow
} from '../../src/50-pow'

type TestCase = {
  input: [number, number]
  expected: number
}

const testCases: TestCase[] = [{
  input: [2.0, 10],
  expected: 1024
}, {
  input: [2.1, 3],
  expected: 9.26100
}, {
  input: [2.0, -2],
  expected: 0.25000
}, {
  input: [0.44894, -5],
  expected: 54.83508
}, {
  input: [0.00001, 2147483647],
  expected: 0
}, {
  input: [1.0, 2147483647],
  expected: 1.0
}, {
  input: [-1.0, 2147483647],
  expected: -1.0
}, {
  input: [0.99999, 948688],
  expected: 0.00008
}, {
  input: [0.999999999, -2147483648],
  expected: 8.56328
}]

describe('50 - Pow', () => {
  describe('myPow', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = myPow(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
