import './renameProperty'

const namePlagin = 'myFilters'

// filters
let filters = {
  slice: (text, from = 0, to = 1) => {
    return text.slice(from, to)
  },
  join: (array, param = undefined) => {
    return array.join(param)
  },
  multiply: (number, multiplier) => {
    return number * multiplier
  }
}
// mixins
let mixins = {
  limitObjBy: (object, length = 0) => {
    let sliced = {}
    let i = 0

    for (let key in object) {
      if (length && i === length) break;
      sliced[key] = object[key]
      i++;
    }

    return sliced
  }
}

const myFilters = {
  install: Vue => {
    // add global filters
    Object.keys(filters).forEach(key => {
      Vue.filter(`$_${namePlagin}_${key}`, filters[key])
    })

    // add global mixins
    Object.keys(mixins).forEach(key => {
      mixins.renameProperty(key, `$_${namePlagin}_${key}`)
    })

    Vue.mixin({
      methods: {
        ...mixins
      }
    })
  }
}

export default myFilters
