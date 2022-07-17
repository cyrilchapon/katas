import { expect } from 'earljs'
import type { Board } from '../../src/37-sudoku-solver'
import { _solveSudoku } from '../../src/37-sudoku-solver'
import { testCases } from './util'

const getTestBoardDimension = (): Board => testCases.hard.input.map(box => ([...box]))
const getExceptedBoardDimension = (): Board => testCases.hard.output

describe('SudokuSolver', () => {
  it('Should resolve hard case', () => {
    const actual = getTestBoardDimension()
    _solveSudoku(actual)

    const expected = getExceptedBoardDimension()
  
    // expect(actual).toEqual(expected)
  })
})
