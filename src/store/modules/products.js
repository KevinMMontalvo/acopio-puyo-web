import axios from 'axios';

export default {
    namespaced: true,
    state: {
        products: undefined,
        currentProduct: null
    },
    mutations: {
        setProducts(state, data)
        {
            state.products = data;
        },
        setCurrentProduct(state, data)
        {
            state.currentProduct = data;
        }
    },
    getters: {
    },
    actions: {
        getProducts({commit, rootState})
        {
            commit('setProducts', undefined);
            axios.get('products').then(function (response)
            {
                let products = response.data;
                commit('setProducts', products);
            }).catch(function (error)
            {
                commit('setProducts', []);
                rootState.message = {
                    visible: true,
                    text: 'Error al consultar los productos',
                    color: 'error'
                };
                console.error(error.response);
            });
        }
    }
};