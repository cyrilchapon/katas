const REFERENCE = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
}

const legitDecimals = [1, 10, 100] as const
type LegitDecimal = typeof legitDecimals[number]

type DecimalReference = {
  1: keyof typeof REFERENCE
  5: keyof typeof REFERENCE
  10: keyof typeof REFERENCE
}

type DecimalReferences = Record<LegitDecimal, DecimalReference>

const DECIMAL_REFERENCE: DecimalReferences = {
  1: {1: 'I', 5: 'V', 10: 'X'},
  10: {1: 'X', 5: 'L', 10: 'C'},
  100: {1: 'C', 5: 'D', 10: 'M'}
}

const THOUSAND_REFERENCE = 'M'

const get1000 = (num: number): number => (
  Math.floor(num / 1000)
)

const get100 = (num: number): number => (
  Math.floor(num / 100) - get1000(num) * 10
)

const get10 = (num: number): number => (
  Math.floor(num / 10) - get1000(num) * 100 - get100(num) * 10
)

const get1 = (num: number): number => (
  Math.floor(num) - get1000(num) * 1000 - get100(num) * 100 - get10(num) * 10
)

function assertLegitDecimal(decimal: number): asserts decimal is LegitDecimal {
  if (!legitDecimals.includes(decimal as LegitDecimal)) {
    throw new TypeError(`decimal should be one of ${JSON.stringify(legitDecimals)}`)
  }
}

const getDecimalStr = (decimal: number) => (num: number): string => {
  assertLegitDecimal(decimal)

  if (num === 9) {
    return DECIMAL_REFERENCE[decimal]['1'] + DECIMAL_REFERENCE[decimal]['10']
  } else if (num > 5) {
    return DECIMAL_REFERENCE[decimal]['5'] + DECIMAL_REFERENCE[decimal]['1'].repeat(num - 5)
  } else if (num === 5) {
    return DECIMAL_REFERENCE[decimal]['5']
  } else if (num === 4) {
    return DECIMAL_REFERENCE[decimal]['1'] + DECIMAL_REFERENCE[decimal]['5']
  } else {
    return DECIMAL_REFERENCE[decimal]['1'].repeat(num)
  }
}

const get1000Str = (num: number): string => DECIMAL_REFERENCE[100][10].repeat(num)

function intToRoman(num: number): string {
  const [num1000, num100, num10, num1] = [get1000(num), get100(num), get10(num), get1(num)]
  const str1000 = get1000Str(num1000)
  const str100 = getDecimalStr(100)(num100)
  const str10 = getDecimalStr(10)(num10)
  const str1 = getDecimalStr(1)(num1)
  return str1000 + str100 + str10 + str1
}

export {
  intToRoman,
  get1000,
  get100,
  get10,
  get1
}
