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
    routes,
    // retouner vers le début de page
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
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
        /**
         * Description : Cette fonction permet de sauter à la page de Recettes si l'utilsateur se connecte déjà
         *
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
         * @état : fini
         */
        sauterRecettes() {
            if (this.connecte) {
                console.log("Vous etes déjà connecté")
                this.$router.push("/recettes").catch(() => {})
            }
        },

        /**
         * Description : Cette fonction permet de sauter à la page d'Accueil si l'utilsateur ne se connecte pas encore
         *
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
         * @état : fini
         */
        sauterAccueil() {
            if (!this.connecte) {
                console.log("Vous n'etes pas connecté")
                this.$router.push("/").catch(() => {})
            }
        },

        /**
         * Description : Cette fonction permet à utilisateur de s'inscrire
         * On va récupérer les l'utilisateur via l'api(post) d'inscription
         * On met à jour la variable connect
         * On saut à la page de recettes
         *
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
         * @état : fini
         */
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

        /**
         * Description : Cette fonction permet à utilisateur de se connecter
         * On va récupérer les l'utilisateur via l'api(post) de connexion
         * On met à jour la variable connect
         * On saut à la page de recettes
         *
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
         * @état : fini
         */
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

        /**
         * Description : Cette fonction permet de maintenir l'état de connexion d'utilisateur au cas de rafraichissement de page
         * On va récupérer les l'utilisateur via l'api(get) de connexion
         * On met à jour la variable connect
         *
         * @return {boolean} indiquer si la fonction est terminé
         * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
         * @état : fini
         */
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

        /**
         * Description : Cette fonction permet à utilisateur de se déconnecter
         * On va utiliser l'api(get) de deconnexion pour vider la session d'utilisateur
         * On saut à la page d'accueil
         *
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
         * @état : fini
         */
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

        /**
         * Description : Cette fonction permet de récupérer une liste de recettes de nombre donné pour le carousel
         * 
         * @param {int} nbrRecette nombre de recette
         * @return {void} 
         * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
         * @état : A FAIRE
         */
        async afficherRecetteCarousel(nbrRecette) {
            try {
                let resultat = (await axios.post('/api/recettesCarousel', nbrRecette)).data
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet de récupérer tous les ingrédients dans BDD
         * 
         * @return {void} 
         * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
         * @état : A FAIRE
         */
        async recupererIngredients() {
            try {
                let resultat = (await axios.get('/api/ingredients')).data
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet de récupérer tous les tags et noms de recette dans BDD
         * 
         * @return {void} 
         * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
         * @état : A FAIRE
         */
        async recupererMotsCles() {
            try {
                let resultat = (await axios.get('/api/motsCles')).data
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet à utilisateur de chercher les recettes en uitilisant les ingrédients
         * les mots clés, les contraintes et les informations personnelles.
         * 
         * @param {list<int>} ingredients une liste d'ids d'ingredients
         * @param {list<string>} mots_cles une liste de mots clés
         * @param {list<object>} contraintes une liste de contraintes
         * @param {list<object>} info_perso une liste des informations personnelles
         * @return {void} 
         * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
         * @état : A FAIRE
         */
        async chercherRecettes(ingredients, mots_cles, contraintes, info_perso) {
            try {
                let resultat = (await axios.post('/api/recettes', listeInfo)).data
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet de récupérer tous les informations concernant la recette
         * 
         * @param {int} idRecette id de recette
         * @return {void} 
         * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
         * @état : A FAIRE
         */
        async consulterRecette(idRecette) {
            try {
                let resultat = (await axios.post('/api/recettes', idRecette)).data
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet de récupérer la liste de recettes recommandées
         * 
         * @param {int} idUtilisateur id d'utilisateur
         * @return {void} 
         * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
         * @état : A FAIRE
         */
        async consulterRecette(idUtilisateur) {
            try {
                let resultat = (await axios.post('/api/recettesRecommandation', idUtilisateur)).data
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet de mettre à jour la table utilisateur_recette par la clique sur la recette de recommandation
         * 
         * @param {int} idRecette id de recette
         * @param {int} idUtilisateur id d'utilisateur
         * @return {void} 
         * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
         * @état : A FAIRE
         */
        async consulterRecette(idRecette, idUtilisateur) {
            try {
                let resultat = (await axios.post('/api/recettesRecommandation', listeId)).data
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },
    }
})