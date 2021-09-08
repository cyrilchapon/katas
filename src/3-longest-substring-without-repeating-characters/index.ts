const longestSubstring = (s: string): string => {
  const chars = s.split('')
  let previousLongest = ''
  let previousNonRepeating = ''

  chars.forEach(char => {
    const previousNonRepeatingParts = previousNonRepeating.split(char)
    if (previousNonRepeatingParts.length === 2) {
      previousNonRepeating = previousNonRepeatingParts[1]
    }

    previousNonRepeating = previousNonRepeating + char

    if (previousNonRepeating.length > previousLongest.length) {
      previousLongest = previousNonRepeating
    }
  })

  return previousLongest
}

function lengthOfLongestSubstring(s: string): number {
  return longestSubstring(s).length
}

export {
  longestSubstring,
  lengthOfLongestSubstring
}
