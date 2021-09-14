function compress(chars: string[]): number {
  const groups = chars.join('').match(/(.)\1*/g) ?? []
  const compressedChars = groups.reduce<string[]>((acc, group) => {
      acc.push(group.charAt(0))
      if (group.length > 1) {
          `${group.length}`.split('').forEach(lengthDigit => acc.push(lengthDigit))
      }
      return acc
  }, [])

  compressedChars.forEach((compressedChar, i) => chars[i] = compressedChar)

  return compressedChars.length
};

export {
  compress
}
