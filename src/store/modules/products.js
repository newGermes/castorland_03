import { getProducts } from '../../api'

// initial state
const state = {
    products: { 
      /*_items: [], 
        _links: {}, 
        _meta:{}  */ 
    }
}
  
// getters
const getters = {
  allProducts: state => state.products._items,
  nextPageHref: state => state.products._links.next.href,
  currentPagePosition: state => state.products._meta.page,
  lastPageHref: state => state.products._links.last.href
}

// actions
const actions = {
  GET_ALL_PRODUCTS: ({ commit }, { page, typePagination }) => {
    getProducts(page)
      .then(response => {
        response = response.data;        
        commit('RECEIVE_PRODUCTS', {response, typePagination})
      })
      .catch(error => {
          console.error(error)
      })
  }
}

// mutations
const mutations = {
  RECEIVE_PRODUCTS: (state, {response, typePagination}) => {
    if (typePagination === 'start') {
      state.products = response
    } else if (typePagination === 'plus') {
      state.products._items = [...state.products._items, ...response._items]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}