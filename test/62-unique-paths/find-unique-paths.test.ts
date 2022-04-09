// import { expect } from 'earljs'

// import {
//   _initEmptyGrid,
//   findUniquePaths
// } from '../../src/62-unique-paths'

// type SimpleTestCase = {
//   input: null[][]
//   expected: [number, number][][]
// }

// type HardTestCase = {
//   input: [number, number]
//   expected: number
// }

// const simpleTestCases: SimpleTestCase[] = [{
//   input: [
//     [null, null, null],
//     [null, null, null]
//   ],
//   expected: [
//     [[0, 0], [0, 1], [0, 2], [1, 2]],
//     [[0, 0], [1, 0], [1, 1], [1, 2]],
//     [[0, 0], [0, 1], [1, 1], [1, 2]]
//   ]
// }]

// const hardTestCases: HardTestCase[] = [{
//   input: [3, 2],
//   expected: 3
// }, {
//   input: [3, 7],
//   expected: 28
// }, {
//   input: [7, 3],
//   expected: 28
// }, {
//   input: [3, 3],
//   expected: 6
// }, {
//   input: [23, 12],
//   expected: 193536720
// }]

// describe('62 - Find unique paths', () => {
//   describe('findUniquePaths', () => {
//     simpleTestCases.forEach((testCase) => {
//       it(`should return the ${JSON.stringify(testCase.expected.length)} paths for ${JSON.stringify([testCase.input[0].length, testCase.input.length])}`, () => {
//         const input = testCase.input
//         const result = findUniquePaths(input)

//         expect(result).toBeAnArrayWith(...testCase.expected)
//       })
//     })
//     hardTestCases.forEach((testCase) => {
//       it(`should return the ${JSON.stringify(testCase.expected)} paths for ${JSON.stringify(testCase.input)}`, () => {
//         const input = _initEmptyGrid(...testCase.input)
//         const result = findUniquePaths(input)

//         expect(result.length).toEqual(testCase.expected)
//       })
//     })
//   })
// })
