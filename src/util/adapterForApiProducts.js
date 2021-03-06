export const adapter = response => {
  let adapter = {
      items: [],
      links: {},
      meta: {}
  }

  Object.keys(adapter).forEach(key => adapter[key] = response.data[`_${key}`])
  adapter.items = adapter.items.map(item => ({
    id: item.id,
    price: item.price ? item.price.retail : 0,
    name: item.name ? item.name : 'no name',
    img_url: item.images[0]
                ? item.images[0].thumbnails.category.url
                : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
    meta: item.meta
  }))

  /**
   * add a number of the last page
   */
  adapter.meta.last_page = Math.ceil(adapter.meta.total/adapter.meta.max_results)

  return adapter
}
