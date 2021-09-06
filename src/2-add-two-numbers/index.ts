class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

const listNodeToDigits = (listNode: ListNode | null): number[] => {
  let digits: number[] = []

  let currentListNode: ListNode | null = listNode

  while(currentListNode != null) {
    const digit = currentListNode.val
    digits.push(digit)

    currentListNode = currentListNode.next
  }

  return digits.reverse()
}

const digitsToString = (digits: number[]): string => (
  digits.reduce<string>((acc, digit) => `${acc}${digit}`, '')
)

const digitsToNumber = (digits: number[]): number => (
  parseInt(digitsToString(digits), 10)
)

const listNodeToNumber = (listNode: ListNode | null): number => (
  digitsToNumber(listNodeToDigits(listNode))
)

const digitsToListNode = (digits: number[]): ListNode | null => {
  // '1234'
  let nextListNode: ListNode | null = null

  digits.reverse().forEach(digit => {
    nextListNode = new ListNode(digit, nextListNode)
  })

  return nextListNode
}

const stringToDigits = (str: string): number[] => (
  str.split('').map(char => parseInt(char, 10))
)

const numberToDigits = (n: number): number[] => (
  stringToDigits(`${n}`)
)

const numberToListNode = (n: number): ListNode | null => (
  digitsToListNode(numberToDigits(n))
)

const getDigits = (l1: ListNode | null, l2: ListNode | null): number[] => {
  let currentL1 = l1
  let currentL2 = l2

  let digits = []
  let retained = 0
  while (currentL1 != null || currentL2 != null) {
    const currentDigitResult = (
      (currentL1?.val ?? 0) +
      (currentL2?.val ?? 0) +
      retained
    )

    retained = Math.floor(currentDigitResult / 10)
    const used = currentDigitResult - (retained * 10)

    digits.push(used)

    currentL1 = currentL1?.next ?? null
    currentL2 = currentL2?.next ?? null
  }

  if (retained > 0) {
    digits.push(retained)
  }

  return digits
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const resultDigits = getDigits(l1, l2)
  const resultListNode = digitsToListNode(resultDigits)

  return resultListNode
}

export {
  ListNode,
  addTwoNumbers,
  listNodeToDigits,
  digitsToString,
  digitsToNumber,
  listNodeToNumber,
  digitsToListNode,
  stringToDigits,
  numberToDigits,
  numberToListNode,
  getDigits
}
