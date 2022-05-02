import axios from 'axios';

export default {
    namespaced: true,
    state: {
        sacks: undefined,
        currentSack: {}
    },
    mutations: {
        setSacks(state, data)
        {
            state.sacks = data;
        },
        setCurrentSack(state, data)
        {
            state.currentSack = data;
        }
    },
    getters: {
    },
    actions: {
        getSacks({commit, rootState})
        {
            commit('setSacks', undefined);
            axios.get('sacks').then(function (response)
            {
                let articles = response.data;
                commit('setSacks', articles);
            }).catch(function (error)
            {
                commit('setSacks', []);
                rootState.message = {
                    visible: true,
                    text: 'Error al consultar las artículos',
                    color: 'error'
                };
                console.error(error.response);
            });
        }
    }
};