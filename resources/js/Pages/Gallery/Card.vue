<template>
    <div class="card_item">
        <div class="card_image">
            <img
                alt=""
                :src="item.webformatURL"
            />
        </div>
        <div class="card_item_elems">
            <div class="card_item-tags">{{ item.tags }}</div>
            <div class="card_item-user">{{ item.user }}</div>
            <!-- <div class="card_item-likes">10</div> -->
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
    name: "Card"
};
</script>

<style scoped>

</style>