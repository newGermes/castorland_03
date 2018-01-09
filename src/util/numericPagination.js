export const getNumerical = (index, length, activeNumericPages) => {
    let statePages = [index - 4 > 0 ? index - 4 : 0,
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
// rewrite -- start
    if (statePages[0].index !== 1) {
        statePages[0].index = statePages[0].view = 1
        statePages[1].index = statePages[2].index - 1
        statePages[1].view = '...'
    }
    if (statePages[statePages.length - 1].index !== length) {
        statePages[statePages.length - 1].index
            = statePages[statePages.length - 1].view = length
        statePages[statePages.length - 2].index =
            statePages[statePages.length - 1].index - 1
        statePages[statePages.length - 2].view = '...'
    }
// rewtire -- end
    activeNumericPages.length
        ? activeNumericPages.forEach(page => {
            statePages.forEach(item => {
                item.index === page ? item.active = true : false
            })
          })
        : activeNumericPages[0] = index

    return statePages
}
