import axios from 'axios';

export default {
    namespaced: true,
    state: {
        farmers: undefined,
        currentFarmer: null
    },
    mutations: {
        setFarmers(state, data)
        {
            state.farmers = data;
        },
        setCurrentFarmer(state, data)
        {
            state.currentFarmer = data;
        }
    },
    getters: {
    },
    actions: {
        getFarmers({commit, rootState})
        {
            commit('setFarmers', undefined);
            axios.get('farmers').then(function (response)
            {
                let farmers = response.data;
                commit('setFarmers', farmers);
            }).catch(function (error)
            {
                commit('setFarmers', []);
                rootState.message = {
                    visible: true,
                    text: 'Error al consultar los productores',
                    color: 'error'
                };
                console.error(error.response);
            });
        }
    }
};