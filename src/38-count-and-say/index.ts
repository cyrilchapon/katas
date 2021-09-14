const sayNumber = (digits: string): string => {
  const groups = digits.match(/(.)\1*/g) ?? []

  const sayGroups = groups.map(group => `${group.length}${group.charAt(0)}`)
  const saySequence = sayGroups.join('')

  return saySequence
}

function countAndSay(n: number): string {
  let prevSayed = ''
  for (let i = 1; i <= n; i++) {
    prevSayed = i === 1 ? '1' : sayNumber(prevSayed)
  }
  return prevSayed
}

export {
  countAndSay
}