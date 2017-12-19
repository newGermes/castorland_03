import axios from 'axios'

const _api = 'http://test.nv4hqsgnvx.eu-central-1.elasticbeanstalk.com/';

export function getProducts(page = 'products') {
    return axios.get(_api + page);
}