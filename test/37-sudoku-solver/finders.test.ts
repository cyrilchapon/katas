import { expect } from 'earljs'

import {
  Board,
  BoardCandidates,
  findSingleHiddenCandidates
} from '../../src/37-sudoku-solver'

describe('SudokuSolver', () => {
  describe('Finders', () => {
    describe('findSingleHiddenCandidates', () => {
      it('should return consistent', () => {
        const input = [
          [['1', '2'], ['1', '2'], [], [], [], [], [], [], []],
          [['2'], ['2'], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], ['1'], [], [], [], [], [], [], []]
        ]

        let actual: BoardCandidates
        let expected: BoardCandidates

        actual = findSingleHiddenCandidates(input)
        expected = [
          [['1'], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], ['1'], [], [], [], [], [], [], []]
        ]

        expect(actual).toEqual(expected)
      })
    })
  })
})