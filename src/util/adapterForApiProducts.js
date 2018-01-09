export const adapter = response => {
    let adapter = {
        items: [],
        links: {},
        meta: {}
    }

    for (let key in adapter) adapter[key] = response.data[`_${key}`]
    adapter.items = adapter.items.map(item => ({
      id: item.id,
      price: item.price ? item.price.retail : 0,
      name: item.name ? item.name : 'no name',
      img_url: item.images[0]
                  ? item.images[0].thumbnails.category.url
                  : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
      subject: item.meta["Тематика"]
                      ? item.meta["Тематика"][0]
                      : 'no subject',
      quantity: item.meta["Количество деталей"]
                      ? item.meta["Количество деталей"][0]
                      : 'no quantity',
      size: item.meta["Размер пазла"]
                  ? item.meta["Размер пазла"][0]
                  : 'no size',
      age: item.meta["Возраст"] ? item.meta["Возраст"][0] : 'no age'
    }))

    /**
     * add a number of the last page
     */
    adapter.meta.last_page = Math.ceil(
        adapter.meta.total / adapter.meta.max_results
    )

    return adapter
}
