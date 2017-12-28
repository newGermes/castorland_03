import { getProducts, getCurrentPage } from '../../api'

// initial state
const state = {
  products: {
    items:[],
    links:{},
    meta: {},
    pagination: [],
    isLoad: false
  }
}

// getters
const getters = {
  allProducts: state => state.products.items,
  pagePagination: state => state.products.pagination,
  nextPageHref: state => state.products.links.next 
                          ? state.products.links.next.href
                          : false,
  currentPagePosition: state => state.products.meta.page,
  lastPagePosition: state => state.products.meta.last_page,
  isLoad: state => state.products.isLoad
}

// actions
const actions = {
  GET_ALL_PRODUCTS: ({ commit, getters }, { page, typePagination }) => {
    commit('SET_LOAD', { 
      flag: true 
    })
    getProducts(page)
      .then(response => {
        commit('RECEIVE_PRODUCTS', {
          response, 
          typePagination
        })
        commit('SET_PAGINATION', { 
          index: getters.currentPagePosition,
          length: getters.lastPagePosition
         })
        commit('SET_LOAD', { 
          flag: false
        })
      })
      .catch(error => {
        console.error(`Error in ACTIONS: GET_ALL_PRODUCTS ${error}`)
      })
  }
}

// mutations
const mutations = {
  RECEIVE_PRODUCTS: (state, { response, typePagination }) => {
    if (typePagination === 'next') {
      for (let key in response) state.products[key] = response[key]
    } else if (typePagination === 'plus') {
      for (let key in response) key === 'items' 
        ? state.products[key].push(...response[key])
        : state.products[key] = response[key]
    }
  },
  SET_PAGINATION: (state, {  index, length }) => {
    state.products.pagination.length = 0;
    for (let i = 1; i <= length; i++) {
      i === index
        ? state.products.pagination.push({ index: i, active: true })
        : state.products.pagination.push({ index: i, active: false }) 
    }
  },
  SET_LOAD: (state, { flag }) => {
    state.products.isLoad = flag
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}