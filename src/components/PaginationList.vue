<template>
    <div class="pagination">
        <button @click="getMoreProducts(page, 'more')" class="pagination_more active">
            <i class="icon-reload"></i>Показать еще 25 товаров
        </button>
        <div class="pagination_page">
            <span class="btn_red_right active">{{ currentPage }}</span>
            <span class="btn_red_right">2</span>
            <span class="btn_red_right">last</span>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            typePagination: 'more'
        }
    },
    computed: {
        ...mapGetters({
            page: 'nextPage',
            currentPage: 'currentPage',
            lastPage: 'lastPage'
        })
    },
    methods: {
        // ...mapActions({
        //     getNextPage: 'GET_ALL_PRODUCTS'
        // })
        getMoreProducts: (page, typePagination) => {
            return this.$store.dispatch('GET_ALL_PRODUCTS', {
                page: page,
                typePagination: typePagination
            })
        }
    }
}
</script>

<style>

</style>
