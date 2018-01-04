export const getNumerical = (index, length, activeNumericPages) => {
    let temp_array = []
    let template_array = [index - 4 > 0 ? index - 4 : 0, 
                    index - 3 > 0 ? index - 3 : 0, 
                    index - 2 > 0 ? index - 2 : 0, 
                    index - 1 > 0 ? index - 1 : 0, 
                    index, 
                    index + 1 > length ? 0 : index + 1,
                    index + 2 > length ? 0 : index + 2, 
                    index + 3 > length ? 0 : index + 3, 
                    index + 4 > length ? 0 : index + 4].filter(elm => elm > 0)
                   
    template_array.forEach((elm, i) => {
        elm === index
        ? temp_array.push({ index: elm, view: elm, active: true })
        : temp_array.push({ index: elm, view: elm, active: false })
    })

    if (temp_array[0].index !== 1) {
        temp_array[0].index = temp_array[0].view = 1
        temp_array[1].index = temp_array[2].index - 1
        temp_array[1].view = '...'
    }
    if (temp_array[temp_array.length - 1].index !== length) {
        temp_array[temp_array.length - 1].index 
            = temp_array[temp_array.length - 1].view = length
        temp_array[temp_array.length - 2].index = 
            temp_array[temp_array.length - 1].index - 1
        temp_array[temp_array.length - 2].view = '...'
    }

    activeNumericPages.length 
        ? activeNumericPages.forEach(page => {
            temp_array.forEach(item => {
                item.index === page ? item.active = true : false
            })            
          })
        : activeNumericPages[0] = index

    return temp_array
}