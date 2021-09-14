const allowedDigits = [2, 3, 4, 5, 6, 7, 8, 9] as const
type AllowedDigit = typeof allowedDigits[number]

const digitsLetters: Record<AllowedDigit, string[]> = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
}

const strToDigit = (digitStr: string): AllowedDigit => {
  const digitNum = parseInt(digitStr, 10) as AllowedDigit

  if (!allowedDigits.includes(digitNum as AllowedDigit)) {
    throw new Error(`${digitStr} is not an allowed digit`)
  }

  return digitNum
}

const getDigits = (digitsStr: string): AllowedDigit[] => {
  const digitsStrArr = digitsStr.split('')
  return digitsStrArr.map(strToDigit)
}

const getNext = (acc: string[]) => (prevWord: string) => (remainingDigits: AllowedDigit[]) => {
  const digit = remainingDigits[0]
  const digitLetters = digitsLetters[digit]

  const nextDigits = remainingDigits.slice(1)
  const endReached = nextDigits.length === 0

  digitLetters.forEach(letter => {
    const newWord = prevWord + letter

    if (endReached) {
      acc.push(newWord)
    } else {
      getNext(acc)(newWord)(nextDigits)
    }
  })
}

function letterCombinations(_digits: string): string[] {
  const digits = getDigits(_digits)
  if (digits.length === 0) {
    return []
  }
  const acc: string[] = []
  getNext(acc)('')(digits)
  return acc
}

export {
  letterCombinations
}
