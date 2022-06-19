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
        messageErreur: null,
        utilisateur: {
            idUtilisateur: null,
            email: null,
            surnom: null,
        },
        connecte: null,
    },
    async mounted() {
        this.restConnecter() //mettre à jour le mode de connexion 
    },
    methods: {
        sauterRecettes() {
            if (this.connecte) {
                console.log("Vous etes déjà connecté")
                this.$router.push("/recettes").catch(() => {})
            }
        },
        sauterAccueil() {
            if (!this.connecte) {
                console.log("Vous n'etes pas connecté")
                this.$router.push("/").catch(() => {})
            }
        },
        async inscription(utilisateur) {
            try {
                let resultat = (await axios.post('/api/inscription', utilisateur)).data
                this.utilisateur = resultat.utilisateur
                this.connecte = true //changer la mode de connexion
                this.$router.push("/recettes").catch(() => {}) //sauter à la page de recettes
            } catch (erreur) {
                this.connecte = false
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },
        async connecter(utilisateur) {
            try {
                let resultat = (await axios.post('/api/connexion', utilisateur)).data //récupérer les informations de l'utilisateur
                this.utilisateur = resultat.utilisateur
                this.connecte = true //changer la mode de connexion
                this.$router.push("/recettes").catch(() => {}) //sauter à la page de recettes
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },
        async restConnecter() {
            try {
                let resultat = (await axios.get('/api/connexion')).data //vérifier l'état de connexion
                this.utilisateur = resultat.utilisateur
                this.connecte = true //mettre à jour le mode de connexion en connecté
            } catch (erreur) {
                if (erreur.response.statusCode === 401) { //déconnecter
                    this.connected = false
                } else { //afficher message d'erreur dans console
                    console.log('erreur', erreur)
                }
            }
            return true //indiquer si la fonction est terminé
        },
        async deconnecter() {
            try {
                await axios.get('/api/deconnexion') //rappeler la fonction pour se déconnecter
                this.connecte = false //changer la mode de connexion
                this.$router.push("/").catch(() => {}) //sauter à la page d'acceuille
            } catch (erreur) {
                //afficher le message d'erreur dans console
                console.log('erreur', erreur)
            }
        },
    }
})