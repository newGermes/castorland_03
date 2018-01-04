import axios from 'axios'
import { adapter } from '../util/adapterForApiProducts'

const _api = 'http://test.nv4hqsgnvx.eu-central-1.elasticbeanstalk.com/'
const _productParam = 'products?where={"catalogs":"castorland"}&page='

export const getProducts = (page) => new Promise((resolve, reject) => {
    let isString = (typeof page === 'string')
    let query = undefined

    isString
        ? query = _api + page
        : query = _api + _productParam + page
    axios.get(query)
        .then(response => {
            resolve(adapter(response))
        })
        .catch(error => {
            console.warn(`Error in API ${error}`)
            reject(error)
        })
})
