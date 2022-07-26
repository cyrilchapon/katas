import { AssertionError } from 'assert'
import { expect } from 'earljs'
import { Board } from '../../src/37-sudoku-solver'
import { _solveSudoku, isBoardValid, isBoardOver } from '../../src/37-sudoku-solver'
import { TestCase, testCases } from './util'

const getTestBoardDimension = (testCase: TestCase): Board => testCase.input
const getExceptedBoardDimension = (testCase: TestCase): Board => testCase.output

describe('SudokuSolver', () => {
  describe('_solveSudoku()', () => {
    Object
      .entries(testCases)
      .filter(([testCaseStyle, testCase]) => (
        ([
          'easy',
          'medium',
          'hard',
          'expert',
          'hardcore'
        ] as string[]).includes(testCaseStyle))
      )
      .forEach(([testCaseStyle, testCase]) => {
        describe(`${testCaseStyle} case`, () => {
          it('Should produce a valid board', () => {
            const input = testCase.input
            const _actual = _solveSudoku(input)
            const actual = isBoardValid('.')(_actual)
            const expected = true
            expect(actual).toEqual(expected)
          })
    
          it('Should produce an over board', () => {
            const input = testCase.input
            const _actual = _solveSudoku(input)
            const actual = isBoardOver('.')(_actual)
            const expected = true
            expect(actual).toEqual(expected)
          })
        
          it('Should resolve', () => {
            const input = testCase.input
            const actual = _solveSudoku(input)
        
            const expected = testCase.output
            expect(actual).toEqual(expected)
          })
        })
      })
  })
})
