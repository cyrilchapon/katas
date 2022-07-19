import { expect } from 'earljs'
import type { Board } from '../../src/37-sudoku-solver'
import { _solveSudoku, isBoardValid, isBoardOver } from '../../src/37-sudoku-solver'
import { testCases } from './util'

const getTestBoardDimension = (): Board => testCases.hard.input
const getExceptedBoardDimension = (): Board => testCases.hard.output

describe('SudokuSolver', () => {
  describe('_solveSudoku()', () => {
    describe('hard case', () => {
      it('Should produce a valid board', () => {
        const input = testCases.hard.input
        const _actual = _solveSudoku(input)
        const actual = isBoardValid('.')(_actual)
        const expected = true
        expect(actual).toEqual(expected)
      })

      it('Should produce an over board', () => {
        const input = testCases.hard.input
        const _actual = _solveSudoku(input)
        const actual = isBoardOver('.')(_actual)
        const expected = true
        expect(actual).toEqual(expected)
      })
    
      it('Should resolve', () => {
        const input = getTestBoardDimension()
        const actual = _solveSudoku(input)
    
        const expected = getExceptedBoardDimension()
        expect(actual).toEqual(expected)
      })
    })
  })
})
