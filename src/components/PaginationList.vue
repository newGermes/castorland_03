<template>
    <div class="pagination">
        <button @click="getNextPage(nextPage, 'plus')" class="pagination_more active">
            <i class="icon-reload"></i>Показать еще 25 товаров
        </button>
        <div class="pagination_page">
            <!-- <span class="btn_red_right active"> {{ pagePosition || 1}} </span>-->
            <span v-for="p in pages" :key="p.index">
                <span class="btn_red_right" :class="{ active: p.active }" @click="getCurrentPage(p.index, 'next')"> {{ p.index }} </span>
            </span>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'pagination-list',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            nextPage: 'nextPageHref',
            pages: 'pagePagination'
        })
    },
    methods: {
        getNextPage(page, typePagination) {            
            return this.$store.dispatch('GET_ALL_PRODUCTS', {
                page,
                typePagination
            })
        },
        getCurrentPage(number, typePagination) {
            return this.$store.dispatch('GET_CURRENT_PAGE', {
                number,
                typePagination
            })
        }
    }
}
</script>

<style>

</style>
