const store = new Vuex.Store({
    state: {
        sitename: 'Bonsai-Club',
        cart: [],
        products: [],
    },
    getters: {
        cartItemCount(state) {
            return state.cart.length;
        }

    },
    mutations: {
        addToCart(state, id) {
            state.cart.push(id);
        },
        addProducts(state, arrProducts) {
            for (let i = 0; i < arrProducts.length; i++) {
                state.products.push(arrProducts[i]);
            }
        }
    },
    actions: {
        loadData({commit}) {
            commit('addProducts', window.products);
        }
    }
});

store.dispatch('loadData');