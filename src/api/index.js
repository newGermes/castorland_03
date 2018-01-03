import axios from 'axios'

const _api = 'http://test.nv4hqsgnvx.eu-central-1.elasticbeanstalk.com/'
const _productParam = 'products?where={"catalogs":"castorland"}&page='

export const getProducts = (page) => new Promise((resolve, reject) => {
    let isString = (typeof page === 'string')
    let query = undefined
    let adapter = {
        items: [],
        links: {},
        meta: {}
    }

    isString
        ? query = _api + page
        : query = _api + _productParam + page
    axios.get(query)
        .then(response => {
            let temp_items = [];

            for (let key in adapter) adapter[key] = response.data[`_${key}`]
            for (let item of adapter.items) {
                let [
                    id, 
                    price_retail, 
                    name,
                    image_url,
                    meta_subject,
                    meta_quantity,
                    meta_size,
                    meta_age
                ] = [
                    item.id,
                    item.price ? item.price.retail : 0,
                    item.name ? item.name : 'no name',
                    item.images[0] 
                        ? item.images[0].thumbnails.category.url 
                        : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
                    item.meta["Тематика"] ? item.meta["Тематика"][0] : 'no subject',
                    item.meta["Количество деталей"] ? item.meta["Количество деталей"][0] : 'no quantity',
                    item.meta["Размер пазла"] ? item.meta["Размер пазла"][0] : 'no size',
                    item.meta["Возраст"] ? item.meta["Возраст"][0] : 'no age'
                ]
                temp_items.push({                    
                    id, 
                    price_retail, 
                    name,
                    image_url,
                    meta_subject,
                    meta_quantity,
                    meta_size,
                    meta_age
                })
            }
            adapter.items = temp_items
            adapter.meta.last_page = Math.ceil(
                adapter.meta.total / adapter.meta.max_results
            )
            resolve(adapter)
        })
        .catch(error => {
            console.warn(`Error in API ${error}`)
            reject(error)
        })
})
