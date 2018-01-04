<template>
  <div id="app" class="main_content_center">
    <h1 class="title_block">Настольные игры для девочек от 3 лет, тематика архитектура</h1>
    <!--begin filter settings-->
    <div class="filter_settings">
        <div class="filter_left">
            <div class="list_filter_setting">
                <div class="filter_elem">
                    <i class="close_filter">+</i>
                    <span class="text_filter">для девочек</span>
                </div>
                <div class="filter_elem">
                    <i class="close_filter">+</i>
                    <span class="text_filter">от 3 лет</span>
                </div>
                <div class="filter_elem">
                    <i class="close_filter">+</i>
                    <span class="text_filter">архитектура</span>
                </div>
                <div class="filter_elem filter_reset">
                    <i class="close_filter">+</i>
                    <span class="text_filter">Сбросить фильтр</span>
                </div>
            </div>
            <p class="filter_search">Найдено
                <span>30</span> товаров из
                <span>110</span>
            </p>
        </div>
        <div class="queue">
            <span class="queue_top">Сортировка</span>
            <div class="queue_active">по цене</div>
            <ul class="select_queue">
                <li class="active">по цене</li>
                <li>по рейтингу</li>
                <li>от дешевых к дорогим</li>
            </ul>
        </div>
    </div>
    <!--end filter settings-->
    <!--begin result filter-->
    <result-list></result-list>
    <!--end result filter-->
    <!--begin pagination-->
    <pagination-list></pagination-list>
    <!--end pagination-->
</div>
</template>

<script>
import ResultList from './components/ResultList.vue'
import PaginationList from './components/PaginationList.vue'

export default {
    components: {
        ResultList,
        PaginationList
    }
}
</script>

<style>

</style>
