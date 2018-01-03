<template>
    <div class="pagination">
        <button class="pagination_more"
                :class="{ active: stateMoreButton }"
                @click="getPage(nextPage, 'plus')"
                v-if="nextPage"
            >
        <i class="icon-reload"></i>
            Показать еще 25 товаров
        </button>
        <div class="pagination_page">
            <span v-for="p in stateNumericPagination"
                    :key="p.index"
                >
                <span class="btn_red_right"
                        :class="{ active: p.active }"
                        @click="getPage(p.index, 'next')"
                    >
                    {{ p.index }}
                </span>
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
            nextPage: 'nextReferencePage',
            stateNumericPagination: 'stateNumericPagination',
            stateMoreButton: 'stateMoreButton'
        })
    },
    methods: {
        getPage(page, typePagination) {
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
