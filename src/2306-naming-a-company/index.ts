const getFirstLetter = (s: string) => s.slice(0, 1)
const getTrailingLetters = (s: string) => s.slice(1)
const takeFirstLetter = (sA: string, sB: string) => `${getFirstLetter(sB)}${getTrailingLetters(sA)}`
const swapFirstLetters = (sA: string, sB: string): [string, string] => ([
  takeFirstLetter(sA, sB),
  takeFirstLetter(sB, sA)
])

type SuffixGroup = Set<string>

const groupByPrefix = (ideas: string[]) => {
  const ideasByPrefix = ideas.reduce((acc, idea) => {
    const ideaPrefix = getFirstLetter(idea)
    const ideaSuffix = getTrailingLetters(idea)

    let ideaRecord = acc[ideaPrefix]
    if (ideaRecord == null) {
      ideaRecord = new Set()
      acc[ideaPrefix] = ideaRecord
    }
    ideaRecord.add(ideaSuffix)

    return acc
  }, {} as Record<string, SuffixGroup>)

  return ideasByPrefix
}

const xorSuffixGroups = (suffixGroupA: SuffixGroup, suffixGroupB: SuffixGroup): [SuffixGroup, SuffixGroup] => {
  return [
    new Set([...suffixGroupA].filter(suffixA => !suffixGroupB.has(suffixA))),
    new Set([...suffixGroupB].filter(suffixB => !suffixGroupA.has(suffixB))),
  ]
}

const distinctNames = (ideas: string[]): number => {
  const suffixGroups = groupByPrefix(ideas)
  const suffixGroupsEntries = Object.entries(suffixGroups)

  let allowedNames = 0

  // Iterate until length -1 because looking for couples
  for (let a = 0; a < suffixGroupsEntries.length - 1; a++) {
    const [
      suffixGroupAPrefix,
      suffixGroupA
    ] = suffixGroupsEntries[a]

    // Subiterate from previous index
    for (let b = a + 1; b < suffixGroupsEntries.length; b++) {
      const [
        suffixGroupBPrefix,
        suffixGroupB
      ] = suffixGroupsEntries[b]

      const [
        allowedSuffixGroupA,
        allowedSuffixGroupB
      ] = xorSuffixGroups(
        suffixGroupA,
        suffixGroupB
      )

      allowedNames += (allowedSuffixGroupA.size * allowedSuffixGroupB.size * 2)
    }
  }

  return allowedNames
}

// Naive version
// const distinctNames = (ideas: string[]): number => {
//   const ideasSet = new Set(ideas)
//   let allowedNames = 0

//   // Iterate until length -1 because looking for couples
//   for (let a = 0; a < ideas.length - 1; a++) {
//     let ideaA = ideas[a]

//     // Subiterate from previous index
//     for (let b = a + 1; b < ideas.length; b++) {
//       let ideaB = ideas[b]

//       const [_ideaA, _ideaB] = swapFirstLetters(ideaA, ideaB)

//       if (
//         !ideasSet.has(_ideaA) &&
//         !ideasSet.has(_ideaB)
//       ) {
//         allowedNames = allowedNames + 2
//       }
//     }
//   }

//   return allowedNames
// }

export {
  distinctNames,
  getFirstLetter,
  getTrailingLetters,
  takeFirstLetter,
  swapFirstLetters
}
