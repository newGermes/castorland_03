export const getNumerical = (index, length, activeNumericPages) => {
  const stateIndexes = [index - 4 > 0 ? index - 4 : 0,
                  index - 3 > 0 ? index - 3 : 0,
                  index - 2 > 0 ? index - 2 : 0,
                  index - 1 > 0 ? index - 1 : 0,
                  index,
                  index + 1 > length ? 0 : index + 1,
                  index + 2 > length ? 0 : index + 2,
                  index + 3 > length ? 0 : index + 3,
                  index + 4 > length ? 0 : index + 4]
                    .filter(elm => elm > 0)
                    .map(elm => (elm === index)
                                  ? { index: elm, view: elm, active: true }
                                  : { index: elm, view: elm, active: false })

  const addDots = array => {
    let elm1 = array[0]
    let elm2 = array[1]
    let elm3 = array[2]
    let elmLast = array[array.length - 1]
    let elmPrevLast = array[array.length - 2]

    if (elmLast.index !== length && elm1.index === 1) {
      elmLast.index = elmLast.view = length

    }
  }

// rewrite -- start
  if (stateIndexes[0].index !== 1) {
    stateIndexes[0].index = stateIndexes[0].view = 1
    stateIndexes[1].index = stateIndexes[2].index - 1
    stateIndexes[1].view = '...'
  }
  if (stateIndexes[stateIndexes.length - 1].index !== length) {
    stateIndexes[stateIndexes.length - 1].index
      = stateIndexes[stateIndexes.length - 1].view = length
    stateIndexes[stateIndexes.length - 2].index =
      stateIndexes[stateIndexes.length - 1].index - 1
    stateIndexes[stateIndexes.length - 2].view = '...'
  }
// rewtire -- end
  activeNumericPages.length
    ? activeNumericPages.forEach(page => {
        stateIndexes.forEach(item => {
          item.index === page ? item.active = true : false
        })
      })
    : activeNumericPages[0] = index

  return stateIndexes
}
