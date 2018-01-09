<template>
  <div class="result_list_filter">
    <div
        v-for="p in products"
        class="card_min"
        :key="p.id"
        >
    <div class="card_min_wrap">
        <div class="card_min_multimedia">
            <a href="#" class="add_video">
                <i class="icon-film"></i>Видеообзор</a>
            <a href="#" class="add_img">
                <i class="icon-film"></i>Демонстрация товара</a>
        </div>
        <div class="card_min_content">
            <a href="#" class="card_min_img">
                <img :src="p.img_url" alt="" >
            </a>
            <h3 class="card_min_title">{{ p.name }}</h3>
            <a href="#" class="add_comment">
                <i class="icon-speech-bubble-with-text-lines"></i>
                <span>оставить отзыв</span>
            </a>
            <div class="card_min_price">
                <span class="old">
                    {{ p.price * 1.3 }}
                    <span>ГРН</span>
                </span>
                <span class="new">
                    {{ p.price }}
                    <span>ГРН</span>
                </span>
            </div>
            <div class="card_buy_set">
                <div class="min_buy btn_red">
                    <i class="icon-big-shopping-trolley"></i>Купить</div>
                <i class="сompare icon-balance"></i>
                <i class="like_position icon-favorite-heart"></i>
            </div>
            <div class="check_delivery">
                <div class="ok_deliver"></div> Доставка
                <span> 1-3 </span> дня
            </div>
            <p class="card_min_age">Для девочек
               {{ p.age }}
            <p class="card_min_detail">Тема:
                <span>
                    {{ p.subject}}
                </span>
            </p>
            <p class="card_min_detail">Элементов в пазле:
                <span>
                    {{ p.quantity }}
                </span>
            </p>
            <p class="card_min_detail">Размер пазла:
                <span>
                    {{ p.size }}
                </span>
            </p>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'result-list',
    computed: {
        ...mapGetters({
            products: 'allProducts'
        })
    },
    created () {
        this.$store.dispatch('FETCH_ALL_DATA', {
            page: 1,
            typePagination: 'next'
        })
    }
}
</script>

<style>

</style>
