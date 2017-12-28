import { getProducts, getCurrentPage } from '../../api'

// initial state
const state = {
  products: {
    _items:[],
    _links:{},
    _meta: {},
    _pagination: []
  }
}

// getters
const getters = {
  allProducts: state => state.products._items,
  pagePagination: state => state.products._pagination,
  nextPageHref: state => state.products._links.next.href,
  currentPagePosition: state => state.products._meta.page,
  lastPagePosition: state => Math.ceil( state.products._meta.total / state.products._meta.max_results )
}

// actions
const actions = {
  GET_ALL_PRODUCTS: ({ commit, getters }, { page, typePagination }) => {
    getProducts(page)
      .then(response => {
        commit('RECEIVE_PRODUCTS', {
          response: response.data, 
          typePagination
        })
        commit('SET_PAGINATION', { 
          index: getters.currentPagePosition,
          length: getters.lastPagePosition
         })
      })
      .catch(error => {
        console.error(`Error in ACTIONS: GET_ALL_PRODUCTS ${error}`)
      })
  }
}

// mutations
const mutations = {
  RECEIVE_PRODUCTS: (state, {response, typePagination}) => {
    if (typePagination === 'next') {
      for (let key in response) state.products[key] = response[key]
    } else if (typePagination === 'plus') {
      for (let key in response) key === '_items' 
        ? state.products[key] = [...state.products[key], ...response[key]]
        : state.products[key] = response[key]
    }
  },
  SET_PAGINATION: (state, {  index, length }) => {
    state.products._pagination.length = 0;
    for (let i = 1; i <= length; i++) {
      if (i === index) {
        state.products._pagination.push({ index: i, active: true });
      } else {
        state.products._pagination.push({ index: i, active: false });
      }
      
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}