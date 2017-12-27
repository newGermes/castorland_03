import axios from 'axios'

const _api = 'http://test.nv4hqsgnvx.eu-central-1.elasticbeanstalk.com/';
const _productParam = 'products?where={"catalogs":"castorland"}&page=';

export function getProducts(page = _productParam) {
    return toString.call(page) === '[object String]' 
        ? axios.get(_api + page)
        : axios.get(_api + _productParam + page)
}