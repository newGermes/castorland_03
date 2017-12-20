<template>
    <div class="pagination">
        <button @click="getNextPage(page, 'plus')" class="pagination_more active">
            <i class="icon-reload"></i>Показать еще 25 товаров
        </button>
        <div class="pagination_page">
            <span class="btn_red_right active"> 1 </span>
            <span class="btn_red_right">2</span>
            <span class="btn_red_right">...</span>
            <span class="btn_red_right">10</span>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            page: 'nextPageHref'
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
