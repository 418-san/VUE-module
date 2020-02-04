const routes = [
    { path: '/', component: Home, name: 'main'},
    { path: '/productcard/:id/', component: ProductCard, name:'productcard', props:true},
    { path: '/checkout', component: CheckoutForm, name: 'checkout' },
    { path: '/products', component: Products, name: 'products'},
    { path: '/contacts', component: Contacts, name: 'contacts'},
    { path: '/logon', component: Logon, name: 'logon'},
    { path: '/login', component: Login, name: 'login'},

];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});


new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    store,
    router: router,
    data: {
        showDrawer: false
    },
    components: {
        'products': Products,
        'checkout-form': CheckoutForm
    },
    computed: {
        ...Vuex.mapState(['sitename']),
        ...Vuex.mapGetters(['cartItemCount'])
    }
})