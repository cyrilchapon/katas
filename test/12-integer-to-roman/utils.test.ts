import { expect } from 'earljs'

import {
  get1000,
  get100,
  get10,
  get1
} from '../../src/12-integer-to-roman'

type TestCase = {
  input: number
  expected: number
}

const testCases1000: TestCase[] = [{
  input: 5000,
  expected: 5
}, {
  input: 5423,
  expected: 5
}, {
  input: 1000,
  expected: 1
}, {
  input: 900,
  expected: 0
}, {
  input: 0,
  expected: 0
}]

const testCases100: TestCase[] = [{
  input: 500,
  expected: 5
}, {
  input: 523,
  expected: 5
}, {
  input: 1230,
  expected: 2
}, {
  input: 1020,
  expected: 0
}, {
  input: 10,
  expected: 0
}, {
  input: 0,
  expected: 0
}]

const testCases10: TestCase[] = [{
  input: 50,
  expected: 5
}, {
  input: 53,
  expected: 5
}, {
  input: 1230,
  expected: 3
}, {
  input: 1201,
  expected: 0
}, {
  input: 1,
  expected: 0
}, {
  input: 0,
  expected: 0
}]

const testCases1: TestCase[] = [{
  input: 5,
  expected: 5
}, {
  input: 1237,
  expected: 7
}, {
  input: 1260,
  expected: 0
}, {
  input: 0,
  expected: 0
}]

describe('12. Integer To Roman', () => {
  describe('get1000', () => {
    testCases1000.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = get1000(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })

  describe('get100', () => {
    testCases100.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = get100(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })

  describe('get10', () => {
    testCases10.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = get10(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })

  describe('get1', () => {
    testCases1.forEach((testCase, testCaseIndex) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = get1(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
