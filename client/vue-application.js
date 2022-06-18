const MonHeader = window.httpVueLoader('./components/MonHeader.vue')
const MonFooter = window.httpVueLoader('./components/MonFooter.vue')
const Page404 = window.httpVueLoader('./components/Page404.vue')
const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Inscription = window.httpVueLoader('./components/Inscription.vue')
const Recette = window.httpVueLoader('./components/Recette.vue')
const Recettes = window.httpVueLoader('./components/Recettes.vue')


const routes = [
    { path: '/', component: Accueil },
    { path: '/connexion', component: Connexion },
    { path: '/inscription', component: Inscription },
    { path: '/recette', component: Recette },
    { path: '/recettes', component: Recettes },
    { path: '*', component: Page404, }
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#body',
    components: {
        MonHeader,
        MonFooter,
    },
    data: {
        articles: [],
        panier: {
            createdAt: null,
            updatedAt: null,
            articles: []
        }
    },
    async mounted() {
        const res = await axios.get('/api/articles')
        this.articles = res.data
            // const res2 = await axios.get('/api/panier')
            // this.panier = res2.data
    },
    methods: {

    }
})