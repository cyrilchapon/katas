import { expect } from 'earljs'

import {
  longestSubstring
} from '../../src/3-longest-substring-without-repeating-characters'

type TestCase = {
  input: string
  expected: string
}

const testCases: TestCase[] = [{
  input: 'abcabcbb',
  expected: 'abc'
}, {
  input: 'bbbbb',
  expected: 'b'
}, {
  input: 'pwwkew',
  expected: 'wke'
}, {
  input: '',
  expected: ''
}, {
  input: 'dvdf',
  expected: 'vdf'
}]

describe('3. Longest Substring Without Repeating Characters', () => {
  describe('lengthOfLongestSubstring', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should return '${testCase.expected}' for '${testCase.input}'`, () => {
        const result = longestSubstring(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
