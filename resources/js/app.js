require('./bootstrap');

import Vue from "vue";
import VueRouter from "vue-router";

import router from './Router/index';
import App from './App.vue';
import './../sass/gallery.css'

Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
    components: {App}
});
