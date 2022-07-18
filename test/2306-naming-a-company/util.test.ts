import { expect } from 'earljs'

import {
  takeFirstLetter,
  swapFirstLetters
} from '../../src/2306-naming-a-company'

describe('2306 - Naming a company', () => {
  describe('takeFirstLetter()', () => {
    const testCases: { input: [string, string], expected: string }[] = [
      { input: ['hello', 'world'], expected: 'wello' },
      { input: ['world', 'hello'], expected: 'horld' },
      { input: ['w', 'hello'], expected: 'h' },
      { input: ['hello', 'w'], expected: 'wello' },
      { input: ['', 'w'], expected: 'w' },
      { input: ['hello', ''], expected: 'ello' }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = takeFirstLetter(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
  describe('swapFirstLetters()', () => {
    const testCases: { input: [string, string], expected: [string, string] }[] = [
      { input: ['hello', 'world'], expected: ['wello', 'horld'] },
      { input: ['hello', 'w'], expected: ['wello', 'h'] },
      { input: ['h', 'world'], expected: ['w', 'horld'] },
      { input: ['', 'world'], expected: ['w', 'orld'] },
      { input: ['hello', ''], expected: ['ello', 'h'] }
    ]

    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, () => {
        const result = swapFirstLetters(...testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
