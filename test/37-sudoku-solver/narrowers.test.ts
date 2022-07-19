import { expect } from 'earljs'

import {
  narrowCandidatesByFilled,
  narrowResultantCandidatesByFilled,
  narrowHiddenSinglesCandidates,
  narrowHiddenSetsToNaked,
  logFullCandidates
} from '../../src/37-sudoku-solver'

describe('SudokuSolver', () => {
  describe('Narrowers', () => {
    describe('narrowCandidatesByFilled', () => {
      it('should return consistent without value', () => {
        const inputBoard = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.']
        ]
        const inputCandidates = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['7', '9'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]

        const actual = narrowCandidatesByFilled('.')(inputBoard, inputCandidates)
        const expected = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['7', '9'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]
        expect(actual).toEqual(expected)
      })

      it('should return consistent with values', () => {
        const inputBoard = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '6', '.', '.', '.', '.', '.', '6'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '9', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.']
        ]
        const inputCandidates = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['7', '9'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]

        const actual = narrowCandidatesByFilled('.')(inputBoard, inputCandidates)
        const expected = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]
        expect(actual).toEqual(expected)
      })
    })

    describe('narrowResultantCandidatesByFilled', () => {
      it('should return consistent without value', () => {
        const inputBoard = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.']
        ]
        const inputCandidates = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['7', '9'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]

        const actual = narrowResultantCandidatesByFilled('.')(inputBoard, inputCandidates)
        const expected = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['7', '9'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]
        expect(actual).toEqual(expected)
      })

      it('should return consistent with values', () => {
        const inputBoard = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '6', '.', '.', '.', '.', '.', '2'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '9', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.']
        ]
        const inputCandidates = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], ['7', '9'], [], [], [], [], [], []],
          [['9'], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]

        const actual = narrowResultantCandidatesByFilled('.')(inputBoard, inputCandidates)
        const expected = [
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1', '6'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], ['5', '2'], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], ['1'], [], [], [], [], [], []],
          [[], [], ['7', '9'], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []]
        ]

        expect(actual).toEqual(expected)
      })
    })

    describe('narrowHiddenSinglesCandidates', () => {
      it('should return consistent', () => {
        const inputCandidates = [
          [['1', '2'], ['1', '2'], [], [], [], [], [], [], []],
          [['2'], ['2'], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], ['1', '9'], [], [], [], [], [], [], []]
        ]

        const inputHiddenSinglesCandidates = [
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

        const actual = narrowHiddenSinglesCandidates(inputCandidates)(inputHiddenSinglesCandidates)
        const expected = [
          [['1'], ['1', '2'], [], [], [], [], [], [], []],
          [['2'], ['2'], [], [], [], [], [], [], []],
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

    describe('narrowHiddenSetsToNaked', () => {
      it('should return consistent', () => {
        const inputCandidates = [
          [['1', '2', '3'], ['1', '2'], [], [], [], [], [], [], []],
          [[], ['3'], [], [], [], [], [], [], ['6', '8', '4']],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], ['3', '9', '7'], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], ['9', '7', '2'], [], [], []],
          [[], [], [], [], [], ['4'], [], [], []],
          [['1'], [], [], [], [], [], [], [], ['2', '5', '6', '8']],
          [[], [], [], [], [], [], [], [], []]
        ]

        const inputHiddenPairsCandidates = {
          row: [
            [['1', '2'], ['1', '2'], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []]
          ],
          col: [
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], ['6', '8'], [], [], [], [], [], ['6', '8'], []]
          ],
          square: [
            [['1', '2'], ['1', '2'], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [['9', '7'], [], [], [], [], [], [], [], ['9', '7']],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []]
          ]
        }

        const actual = narrowHiddenSetsToNaked(inputCandidates)(inputHiddenPairsCandidates)

        const expected = [
          [['1', '2'], ['1', '2'], [], [], [], [], [], [], []],
          [[], ['3'], [], [], [], [], [], [], ['6', '8']],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], ['9', '7'], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], ['9', '7'], [], [], []],
          [[], [], [], [], [], ['4'], [], [], []],
          [['1'], [], [], [], [], [], [], [], ['6', '8']],
          [[], [], [], [], [], [], [], [], []]
        ]

        expect(actual).toEqual(expected)
      })

      it('should return consistent with triplets', () => {
        const inputCandidates = [
          [['1', '2', '3', '4'], ['1', '2', '3'], [], [], [], ['1', '2'], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], ['3', '5', '7', '2', '8']],
          [[], [], [], [], ['7', '6'], [], [], [], []],
          [[], [], [], ['4', '6', '2'], [], [], [], [], []],
          [[], [], [], [], [], ['4', '7', '1'], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], ['8', '5']],
          [[], [], [], [], [], [], [], [], ['8', '5', '3']]
        ]

        const inputHiddenTripletsCandidates = {
          row: [
            [['1', '2', '3'], ['1', '2', '3'], [], [], [], ['1', '2'], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []]
          ],
          col: [
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], ['3', '5', '8'], [], [], [], [], ['8', '5'], ['8', '5', '3']]
          ],
          square: [
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], ['7', '6'], [], ['4', '6'], [], [], [], [], ['4', '7']],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], [], []]
          ]
        }

        const actual = narrowHiddenSetsToNaked(inputCandidates)(inputHiddenTripletsCandidates)

        const expected = [
          [['1', '2', '3'], ['1', '2', '3'], [], [], [], ['1', '2'], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], ['3', '5', '8']],
          [[], [], [], [], ['7', '6'], [], [], [], []],
          [[], [], [], ['4', '6'], [], [], [], [], []],
          [[], [], [], [], [], ['4', '7'], [], [], []],
          [[], [], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], [], ['8', '5']],
          [[], [], [], [], [], [], [], [], ['8', '5', '3']]
        ]

        expect(actual).toEqual(expected)
      })
    })
  })
})