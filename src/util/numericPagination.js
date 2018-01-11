export const getNumerical = (index, length, activeNumericPages) => {
  const stateOfIndexes = [index - 4 > 0 ? index - 4 : 0,
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
    let elmPrevPrev = array[array.length - 3]

    if (elm1.index !== 1) {
      elm1.index = elm1.view = 1
      elm2.view = '...'
      elm2.index = elm3.index - 1
    }
    if (elmLast.index !== length) {
      elmLast.index = elmLast.view = length
      elmPrevLast.view = '...'
      elmPrevLast.index = elmPrevPrev.index + 1

    }
  }
  const activateIndex = array => {
    activeNumericPages.length
    ? activeNumericPages.forEach(page => {
        array.forEach(item => {
          item.index === page ? item.active = true : false
        })
      })
    : activeNumericPages[0] = index
  }

  // run functions
  addDots(stateOfIndexes)
  activateIndex(stateOfIndexes)

  return stateOfIndexes
}
