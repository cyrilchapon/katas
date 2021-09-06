import { expect } from 'earljs'

import { getBestPrice } from '../../src/potter'

import {
  TestCase,
  basics,
  simpleDiscounts,
  severalDiscounts,
  edgeCases
} from './test-cases'

const testTheCase = (testCase: TestCase) => {
  it('returns right amount', () => {
    const actual = getBestPrice(testCase.books)
    const expected = testCase.expected

    expect(actual).toEqual(expected)
  })
}

describe('Potter Kata', () => {
  describe('basics', () => {
    basics.forEach(testTheCase)
  })
  
  describe('simpleDiscounts', () => {
    simpleDiscounts.forEach(testTheCase)
  })
  
  describe('severalDiscounts', () => {
    severalDiscounts.forEach(testTheCase)
  })
  
  describe('edgeCases', () => {
    edgeCases.forEach(testTheCase)
  })
})
