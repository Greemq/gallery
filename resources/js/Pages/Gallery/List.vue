<template>
    <div>
        <div class="card_list">
            <card v-for="(item,index) in list" :key="index" :item="item"></card>

        </div>
        <div class="footer">
            <button class="button_load" @click="getList">load more</button>
        </div>
    </div>
</template>

<script>
import Card from "./Card";
import request from "../../Helpers/api";

export default {
    name: "List",
    components: {Card},
    data() {
        return {
            list: [],
            page: 1,
            total: 0,
            scrollLoad: false
        };
    },
    methods: {
        getList() {
            request.get('/api/list', {
                params: {page: this.page}
            }).then(res => {
                let tmp = res.data.data;
                this.total += tmp.total;
                this.list = tmp.hits;
                this.page++;
                this.scrollLoad = false;
            });
        },

    },
    mounted() {
        this.getList();
    }
};
</script>

<style scoped>

</style>