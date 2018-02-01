<template>
    <div class="pagination">
        <button class="pagination_more"
                :class="{ active: stateMoreButton }"
                @click="getPage(nextReferencePage, 'plus')"
                v-if="nextReferencePage"
            >
        <i class="icon-reload"></i>
            Показать еще 25 товаров
        </button>
        <div class="pagination_page">
            <span class="btn_red_right"
                    v-for="p in stateNumericPagination"
                    :key="p.index"
                    :class="{ active: p.active }"
                    @click="getPage(p.index, 'next')"
                    v-scroll-to="'#app'"
                >
                 {{ p.view }}
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
        ...mapGetters('products',[
            'nextReferencePage',
            'stateNumericPagination',
            'stateMoreButton'
        ])
    },
    methods: {
        getPage(page, typePagination) {
            return this.$store.dispatch('products/FETCH_ALL_DATA', {
                page,
                typePagination
            })
        }
    }
}
</script>

<style>

</style>
