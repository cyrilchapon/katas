const REFERENCE = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
}

const PARSE_REGEX = /^(?<M>(?<!C)M*)?(?<C>CM|C?D|DC{1,3}|(?:(?<!X)C){1,3})?(?<X>XC|X?L|LX{1,3}|(?:(?<!I)X){1,3})?(?<I>IX|I?V|V?I{1,3})?$/

type RomanDecimalId = 'M' | 'C' | 'X' | 'I'

type RomanParts = {
  [K in RomanDecimalId]: string
}

type RomanDecimal = {
  v1: number
  l1: RomanDecimalId
  l5?: string
  l10?: string
}

const romanDecimals: Record<RomanDecimalId, RomanDecimal> = {
  M: { v1: 1000, l1: 'M' },
  C: { v1: 100, l1: 'C', l5: 'D', l10: 'M' },
  X: { v1: 10, l1: 'X', l5: 'L', l10: 'C' },
  I: { v1: 1, l1: 'I', l5: 'V', l10: 'X' }
}

const splitRomanParts = (parseRegex: RegExp) => (roman: string): RomanParts => {
  const match = roman.match(parseRegex)

  if (match == null) {
    throw new Error('input is not a valid roman number')
  }

  const parts = {
    M: match.groups?.M ?? '',
    C: match.groups?.C ?? '',
    X: match.groups?.X ?? '',
    I: match.groups?.I ?? ''
  }

  return parts
}

const getDecimalMultiplier = (decimalDefinition: RomanDecimal) => (romanPart: string): number => {
  let multiplier = 0

  if (decimalDefinition.l10 != null) {
    if (romanPart === decimalDefinition.l1 + decimalDefinition.l10) {
      multiplier = 9
    } else if (romanPart === decimalDefinition.l10) {
      multiplier = 10
    }
  }

  if (decimalDefinition.l5 != null) {
    if (romanPart === decimalDefinition.l1 + decimalDefinition.l5) {
      multiplier = 4
    } else if (romanPart === decimalDefinition.l5) {
      multiplier = 5
    } else if ((new RegExp(`^${decimalDefinition.l5}${decimalDefinition.l1}{1,3}$`)).test(romanPart)) {
      const numberOf1 = (romanPart.match(new RegExp(decimalDefinition.l1, 'g')) || []).length
      multiplier = 5 + numberOf1
    }
  }

  if ((new RegExp(`^${decimalDefinition.l1}+$`)).test(romanPart)) {
    const numberOf1 = (romanPart.match(new RegExp(decimalDefinition.l1, 'g')) || []).length
    multiplier = numberOf1
  }

  return multiplier
}

const calculate = (romanDecimals: Record<RomanDecimalId, RomanDecimal>) => (romanParts: RomanParts): number => (
  Object.entries(romanParts).reduce((acc, [decimalId, romanPart]) => {
    const decimalDefinition = romanDecimals[decimalId as RomanDecimalId]
    const multiplier = getDecimalMultiplier(decimalDefinition)(romanPart)
    const decimal = (multiplier * decimalDefinition.v1)

    return acc + decimal
  }, 0)
)

function romanToInt(s: string): number {
  const parts = splitRomanParts(PARSE_REGEX)(s)
  const result = calculate(romanDecimals)(parts)

  return result
}

export {
  RomanParts,
  PARSE_REGEX,
  splitRomanParts,
  romanToInt
}
