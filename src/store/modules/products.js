import { getProducts, getCurrentPage } from '../../api'

// initial state
const state = {
  products: {
    _items:[],
    _links:{},
    _meta: {}
  },
  pagination: []
}

// getters
const getters = {
  allProducts: state => state.products._items,
  pagePagination: state => state.pagination,
  nextPageHref: state => state.products._links.next.href,
  currentPagePosition: state => state.products._meta.page,
  lastPagePosition: state => Math.ceil( state.products._meta.total / state.products._meta.max_results ),
  lastPageHref: state => state.products._links.last.href
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
  },
  GET_CURRENT_PAGE: ({ commit, getters }, { number, typePagination }) => {
    getCurrentPage(number)
      .then(response => {
        // response = response.data;        
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
        console.error(`Error in ACTIONS: GET_CURRENT_PAGE ${error}`)
      })
  }
}

// mutations
const mutations = {
  RECEIVE_PRODUCTS: (state, {response, typePagination}) => {
    if (typePagination === 'next') {
      state.products = response
    } else if (typePagination === 'plus') {
      state.products._items = [...state.products._items, ...response._items]
      state.products._links = response._links
      state.products._meta = response._meta
    }
  },
  SET_PAGINATION: (state, {  index, length }) => {
    state.pagination.length = 0;
    for (let i = 1; i <= length; i++) {
      if (i === index) {
        state.pagination.push({ index: i, active: true });
      } else {
        state.pagination.push({ index: i, active: false });
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