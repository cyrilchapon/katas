import { expect } from 'earljs'

import {
  _initEmptyGrid
} from '../../src/62-unique-paths'

describe('62 - Find unique paths', () => {
  describe('_initEmptyGrid', () => {
    it('should init grid correctly', () => {
      const input: [number, number] = [4, 3]
      const expected = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ]
      const result = _initEmptyGrid(...input)

      expect(result).toEqual(expected)
    })
  })
})
