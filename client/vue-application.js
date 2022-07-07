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
    { path: '/recette/:id', component: Recette },
    { path: '/recettes', component: Recettes },
    { path: '*', component: Page404, }
]

const router = new VueRouter({
    routes,
    // retourner vers le début de page après chaque rafraichissment
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
        recettesRecommandation: null,
        recette: null,
        ingredients: null,
        recettes: null,
        recettesTrouvees: null,
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
         * @état : Fini
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
         * @état : Fini
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
         * @état : Fini
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
         * @état : Fini
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
         * @état : Fini
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
         * @état : Fini
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
         * Description : Cette fonction permet de récupérer tous les ingrédients dans BDD
         * 
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
         * @état : Fini
         */
        async recupererNomsIngredients() {
            try {
                let resultat = (await axios.get('/api/nomsIngredients')).data
                this.ingredients = resultat.ingredients
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet de récupérer les noms de toutes les recettes dans BDD
         * 
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
         * @état : Fini
         */
        async recupererNomsRecettes() {
            try {
                let resultat = (await axios.get('/api/nomsRecettes')).data
                this.recettes = resultat.recettes
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },

        /**
         * Description : Cette fonction permet à utilisateur de chercher les recettes en uitilisant
         * les mots clés, les contraintes et les informations personnelles.
         * 
         * @param {list<string>} motsCles une liste de mots clés
         * @param {list<string>} motsClesANePasPrendre une liste de mots clés à ne pas prendre 
         * @param {list<object>} contraintes une liste de contraintes
         * @param {int} imc indice de l'IMC personnel
         * @return {void} 
         * @author author-name(Xiangyu AN) (création : 07-07-2022) (modification : 07-07-2022)
         * @état : Fini
         */
        async chercherRecettes(listeInfo) {
            try {
                let resultat = (await axios.post('/api/recettes', listeInfo)).data
                this.recettesTrouvees = resultat.recettes
                this.recettesTrouvees.forEach(function(recette) {
                    recette.ingredients = recette.ingredients.split(',')
                })
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
         * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
         * @état : Fini
         */
        async consulterRecette(idRecette) {
            try {
                let resultat = (await axios.post('/api/recette', idRecette)).data
                this.recette = resultat.recette[0]
                this.recette.ingredients = this.recette.ingredients.split(',')
                this.recette.etapes = this.recette.etapes.split('.')
                this.recette.etapes = this.recette.etapes.filter(function(etape) { //prendre les étapes non nulles
                    return etape.split(" ").join("").length != 0
                })
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
         * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
         * @état : Fini
         */
        async consulterRecettesRecommandation(idUtilisateur) {
            try {
                let resultat = (await axios.post('/api/recettesRecommandation', idUtilisateur)).data
                this.recettesRecommandation = resultat.recettes
                this.recettesRecommandation.forEach(function(recette) {
                    recette.ingredients = recette.ingredients.split(',')
                })
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
         * @param {int} iteration numéro d'iteration de recommandation de recette
         * @return {void} 
         * @author author-name(Xiangyu AN) (création :06-07-2022) (modification : 06-07-2022)
         * @état : Fini
         */
        async cliquerRecetteRecommandation(listeId) {
            try {
                console.log(listeId);
                await axios.post('/api/cliquerRecetteRecommandation', listeId)
            } catch (erreur) {
                console.log(erreur.response.data.message);
                console.log('erreur', erreur) //afficher le message d'erreur
                this.messageErreur = erreur.response.data.message
            }
        },
    }
})