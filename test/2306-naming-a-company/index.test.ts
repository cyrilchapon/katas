import { expect } from 'earljs'

import {
  distinctNames
} from '../../src/2306-naming-a-company'

import { testCases } from './test-cases'

describe('2306 - Naming a company', () => {
  describe('distinctNames()', () => {
    testCases.forEach((testCase) => {
      it(`should return ${JSON.stringify(testCase.expected)} for ${JSON.stringify(testCase.input)}`, function() {
        const result = distinctNames(testCase.input)

        expect(result).toEqual(testCase.expected)
      })
    })
  })
})
