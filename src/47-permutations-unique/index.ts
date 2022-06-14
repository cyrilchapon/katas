const pruneFrom = (input: number[], used: number[]) => {
  let newInput = [...input]
  used.forEach(usedDigit => {
    const usedDigitIndex = newInput.indexOf(usedDigit)
    newInput = [
      ...newInput.slice(0, usedDigitIndex),
      ...newInput.slice(usedDigitIndex + 1)
    ]
  })
  return newInput
}

const digg = (level: number, results: number[][], input: number[]): number[][] => {
  console.log(level)
  if (level >= input.length) {
    return results
  }

  const appendedResults = results.flatMap(prevResult => pruneFrom(input, prevResult).map(
    inputDigit => [...prevResult, inputDigit]
  ))

  return digg(level + 1, appendedResults, input)
}

const resultsAreEqual = (r1: number[], r2: number[]) => (
  r1.every((digit, i) => digit === r2[i])
)

const uniqueResult = (result: number[][]): number[][] => (
  result.filter(
    (item, i, ar) => (
      ar.findIndex(
        otherItem => resultsAreEqual(item, otherItem)
      ) === i
    )
  )
)

// [0, 1, 2]
function permuteUnique(nums: number[]): number[][] {
  const result = digg(0, [[]], nums)
  return uniqueResult(result)
}

export {
  permuteUnique
}
