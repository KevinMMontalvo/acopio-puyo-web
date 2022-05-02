import Vue from 'vue';
import Vuex from 'vuex';
import sacks from "@/store/modules/sacks";
import farmers from "@/store/modules/farmers";
import products from "@/store/modules/products";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        message:{
            visible:false,
            text: '',
            color: 'primary'
        }
    },
    mutations: {},
    actions: {},
    modules: {
        sacks,
        farmers,
        products
    }
});
