<template>
    <div class="pagination">
        <button @click="getNextPage(nextPage, 'plus')" class="pagination_more active">
            <i class="icon-reload"></i>Показать еще 25 товаров
        </button>
        <div class="pagination_page">
            <span class="btn_red_right active"> {{ pagePosition}} </span>
            <span class="btn_red_right">2</span>
            <span class="btn_red_right">...</span>
            <span class="btn_red_right"> {{ lastPosition }} </span>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'pagination-list',
    computed: {
        ...mapGetters({
            nextPage: 'nextPageHref',
            pagePosition: 'currentPagePosition',
            lastPosition: 'lastPagePosition'
        })
    },
    methods: {
        getNextPage(page, typePagination) {            
            return this.$store.dispatch('GET_ALL_PRODUCTS', {
                page,
                typePagination
            })
        }
    }
}
</script>

<style>

</style>
