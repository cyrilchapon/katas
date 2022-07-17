import { expect } from 'earljs'

import {
  Board,
  getCellValue,
  getBox,
  Box
} from '../../src/37-sudoku-solver'

describe('SudokuSolver', () => {
  describe('Dimensions utils', () => {
    describe('getCellValue', () => {
      it('should return consistent with defaults', () => {
        const input = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '4', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '7', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.']
        ]

        let actual: string
        let expected: string

        actual = getCellValue(input)('col', [4, 2])
        expected = '4'
        expect(actual).toEqual(expected)

        actual = getCellValue(input)('square', [1, 7])
        expected = '4'
        expect(actual).toEqual(expected)

        actual = getCellValue(input)('col', [2, 6])
        expected = '7'
        expect(actual).toEqual(expected)

        actual = getCellValue(input)('square', [6, 2])
        expected = '7'
        expect(actual).toEqual(expected)
      })

      it('should return consistent with reversed', () => {
        const input = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '7', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.']
        ]

        let actual: string
        let expected: string

        actual = getCellValue(input, 'col')('row', [2, 4])
        expected = '4'
        expect(actual).toEqual(expected)

        actual = getCellValue(input, 'col')('square', [1, 7])
        expected = '4'
        expect(actual).toEqual(expected)

        actual = getCellValue(input, 'col')('row', [6, 2])
        expected = '7'
        expect(actual).toEqual(expected)

        actual = getCellValue(input, 'col')('square', [6, 2])
        expected = '7'
        expect(actual).toEqual(expected)
      })
    })

    describe('getBox', () => {
      it('should return consistent with defaults', () => {
        const input = [
          ['.', '.', '.', '.', '3', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '8', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '4', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '7', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '1', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '5', '.', '.', '.', '.'],
          ['1', '9', '7', '.', '3', '.', '.', '.', '.'],
          ['4', '2', '5', '.', '9', '.', '.', '.', '.'],
          ['6', '8', '3', '.', '2', '.', '.', '.', '.']
        ]
  
        let actual: Box
        let expected: Box
  
        actual = getBox(input)('col', 4)
        expected = ['3', '8', '4', '7', '1', '5', '3', '9', '2']
        expect(actual).toEqual(expected)
  
        actual = getBox(input)('square', 6)
        expected = ['1', '9', '7', '4', '2', '5', '6', '8', '3']
        expect(actual).toEqual(expected)
      })
  
      it('should return consistent with reversed', () => {
        const input = [
          ['.', '.', '.', '.', '.', '.', '1', '4', '6'],
          ['.', '.', '.', '.', '.', '.', '9', '2', '8'],
          ['.', '.', '.', '.', '.', '.', '7', '5', '3'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['3', '8', '4', '7', '1', '5', '3', '9', '2'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.']
        ]
  
        let actual: Box
        let expected: Box
  
        actual = getBox(input, 'col')('row', 6)
        expected = ['1', '9', '7', '.', '3', '.', '.', '.', '.']
        expect(actual).toEqual(expected)
  
        actual = getBox(input, 'col')('square', 6)
        expected = ['1', '9', '7', '4', '2', '5', '6', '8', '3']
        expect(actual).toEqual(expected)
      })
    })
  })
})