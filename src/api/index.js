import axios from 'axios'

const _api = 'http://test.nv4hqsgnvx.eu-central-1.elasticbeanstalk.com/';

export function getProducts(page = 'products?where={"catalogs":"castorland"}') {
    return axios.get(_api + page);
}

export function getCurrentPage(number) {
    return axios.get(_api + `products?where={\"catalogs\":\"castorland\"}&page=${number}`);
}