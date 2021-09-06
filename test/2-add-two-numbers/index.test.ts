import { expect } from 'earljs'

import {
  ListNode,
  addTwoNumbers,
  digitsToListNode,
  listNodeToDigits,
  stringToDigits
} from '../../src/2-add-two-numbers'

type TestCase = {
  input: [number[], number[]]
  expected: number[]
}

const formatResult = (_result: ListNode | null): number[] => (
  listNodeToDigits(_result).reverse()
)

const formatExpected = (n: number) => (
  stringToDigits(`${n}`).reverse()
)

const formatInput = ([n1Digits, n2Digits]: [number[], number[]]): [ListNode | null, ListNode | null] => (
  [digitsToListNode(n1Digits), digitsToListNode(n2Digits)]
)

const testCases: TestCase[] = [{
  input: [[1, 2], [2, 2]],
  expected: formatExpected(21 + 22)
}, {
  input: [[2, 4, 3], [5, 6, 4]],
  expected: formatExpected(342 + 465)
}]

describe('2 - Add 2 Numbers', () => {
  describe('addTwoNumbers', () => {
    testCases.forEach((testCase, testCaseIndex) => {
      it(`should return expected ${testCaseIndex}`, () => {
        const input = formatInput(testCase.input)

        const result = formatResult(addTwoNumbers(...input))

        const expected = testCase.expected

        expect(result).toEqual(expected)
      })
    })
  })
})
