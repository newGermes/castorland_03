import { getProducts } from '../../api'
import { getNumerical } from '../../util/numericPagination'

// initial state
const state = {
  products: {
    /** start data from API */
    items: [],
    links: {},
    meta: {},
    /** end data from API */
    numericPagination: [],
    activeNumericPages: [],
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
  FETCH_ALL_DATA: ({ commit, dispatch }, { page, typePagination }) => {
    typePagination === 'plus'
      ? dispatch('ENSURE_ANIMATION_BUTTON', { flag: true })
      : false
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
  SET_ITEMS: (state, { response, typePagination}) => {
    if (typePagination === 'next') {
      Object.keys(response).forEach(key => state.products[key] = response[key])
      state.products.activeNumericPages.length = 0
    } else if (typePagination === 'plus') {
      Object.keys(response).forEach(key => (key === 'items')
                                    ? state.products[key].push(...response[key])
                                    : state.products[key] = response[key])
      state.products.activeNumericPages.push(state.products.meta.page)
    }
  },
  SET_NUMERIC_PAGINATION: (state, {  index, length }) => {
    state.products.numericPagination.length = 0;
    state.products.numericPagination
      = getNumerical(index, length, state.products.activeNumericPages)
  },
  SET_ANIMATION_BUTTON: (state, { flag }) => {
    state.products.animatedMoreButton = flag
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
