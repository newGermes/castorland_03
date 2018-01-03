import { getProducts } from '../../api'

// initial state
const state = {
  products: {
    /** start data from API */
    items: [],
    links: {},
    meta: {},
    /** end data from API */
    numericPagination: [],
    animatedMoreButton: false
  }
}

// getters
const getters = {
  allProducts: state => state.products.items,
  nextReferencePage: state => state.products.links.next
                          ? state.products.links.next.href
                          : false,
  currentNumericPagePosition: state => state.products.meta.page,
  lastNumericPagePosition: state => state.products.meta.last_page,
  stateNumericPagination: state => state.products.numericPagination,
  stateMoreButton: state => state.products.animatedMoreButton
}

// actions
const actions = {
  FETCH_ALL_DATA: ({ commit, dispatch, getters }, { page, typePagination }) => {
    typePagination === 'plus' ? dispatch('ENSURE_ANIMATION_BUTTON', { flag: true }) : false
    getProducts(page)
      .then(response => {
        commit('SET_ITEMS', {
          response,
          typePagination
        })
        dispatch('ENSURE_NUMERIC_PAGINATION')
        dispatch('ENSURE_ANIMATION_BUTTON', { flag: false })
      })
      .catch(error => {
        console.error(`Error in ACTIONS: GET_ALL_PRODUCTS ${error}`)
      })
  },
  ENSURE_NUMERIC_PAGINATION: ({ commit, getters }) => {
    commit('SET_NUMERIC_PAGINATION', {
      index: getters.currentNumericPagePosition,
      length: getters.lastNumericPagePosition
     })
  },
  ENSURE_ANIMATION_BUTTON: ({ commit }, { flag }) => {
    commit('SET_ANIMATION_BUTTON', { flag })
  }
}

// mutations
const mutations = {
  SET_ITEMS: (state, { response, typePagination }) => {
    if (typePagination === 'next') {
      for (let key in response) state.products[key] = response[key]
    } else if (typePagination === 'plus') {
      for (let key in response) key === 'items'
        ? state.products[key].push(...response[key])
        : state.products[key] = response[key]
    }
  },
  SET_NUMERIC_PAGINATION: (state, {  index, length }) => {
    state.products.numericPagination.length = 0;
    for (let i = 1; i <= length; i++) {
      i === index
        ? state.products.numericPagination.push({ index: i, active: true })
        : state.products.numericPagination.push({ index: i, active: false })
    }
  },
  SET_ANIMATION_BUTTON: (state, { flag }) => {
    state.products.animatedMoreButton = flag
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
