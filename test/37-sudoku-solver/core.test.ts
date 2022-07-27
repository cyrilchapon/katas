import { AssertionError } from 'assert'
import { expect } from 'earljs'
import { Board, BoardCandidates, logFullBoard } from '../../src/37-sudoku-solver'
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
          'hardcore',
          'extreme',
          'extreme2'
        ] as string[]).includes(testCaseStyle))
      )
      .forEach(([testCaseStyle, testCase]) => {
        describe(`${testCaseStyle} case`, () => {
          let solved: Board
          let candidates: BoardCandidates
          before(() => {
            const [_solved, _candidates] = _solveSudoku(testCase.input)
            solved = _solved
            candidates = _candidates
          })

          it('Should produce a valid board', () => {
            const input = testCase.input
            const _actual = solved
            const actual = isBoardValid('.')(_actual)
            const expected = true
            expect(actual).toEqual(expected)
          })
    
          it('Should produce an over board', () => {
            const input = testCase.input
            const _actual = solved
            const actual = isBoardOver('.')(_actual)
            const expected = true
            expect(actual).toEqual(expected)
          })
        
          it('Should resolve', () => {
            const input = testCase.input
            const actual = solved
            const expected = testCase.output

            try {
              expect(actual).toEqual(expected)
            } catch (err) {
              logFullBoard(actual, candidates)
              throw err
            }
          })
        })
      })
  })
})
