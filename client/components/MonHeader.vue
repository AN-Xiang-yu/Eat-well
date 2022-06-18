<template>
<header>
    <!-- <nav class="border-b-bleu base-color majuscule background-blanc" v-if="connecte" > -->
    <nav class="border-b-bleu base-color majuscule background-blanc" >
        <ul class="flex a-center jc-between w90 m-auto">
            <div class="flex jc-between a-center barre-menu-image-container">
                <!-- logo du site -->
                <li class="flex-10">
                    <div class="flex jc-center">
                        <router-link :to='cheminLogo'>
                            <img class="barre-menu-image ajouter_chemin_image mt-025r" src="../assets/image/commun/logo.png" alt="logo de site">
                        </router-link>
                    </div>
                </li>
                <!-- trois barres pour la version de smartphone -->
                <li class="flex-10 barre-menu-navphone-container">
                    <div class="flex jc-center">
                        <i id="barre-menu-nav" class="fa-solid fa-bars" v-on:click ="afficherNavPhone()"></i>
                    </div>
                </li>
            </div>
            <!-- Mode non connexion : inscription et connexion de taille de grand écran -->
            <div id="barre-menu-page-container-grand-ecran" class="flex-25 flex jc-between a-center f-700" v-if="!connecte">
                <li class="flex-50 center">
                    <router-link to='/inscription'>
                        <i class="fa-solid fa-user-plus"></i>
                        <span>S'inscrire</span>
                    </router-link>
                </li>
                <li class="flex-50 center">
                    <router-link to='/connexion'>
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <span>Se connecter</span>
                    </router-link>
                </li>
            </div>
            <!-- Mode connexion : recettes et surnom -->
            <div id="barre-menu-page-container-grand-ecran" class="flex-85 flex jc-between a-center f-700" v-else>
                <li class="flex-50 left">
                    <router-link to='/recettes'>
                        <i class="fa-solid fa-utensils"></i>
                        <span>Recettes</span>
                    </router-link>
                </li>
                <li class="flex-50 right">
                    <router-link to='/connexion'>
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <span>Surnom</span>
                    </router-link>
                </li>
                <li class="flex-5 center">
                    <button class="rond button-type1" v-on:click="deconnecter">
                        <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                    </button>
                </li>
            </div>
            <div id="barre-menu-page-container" class="flex-90 m-auto cache f-700">
                <div class="flex direction-column" v-if="!connecte">
                    <li class="flex-50 center">
                        <router-link to='/inscription'>
                            <i class="fa-solid fa-user-plus"></i>
                            <span>S'inscrire</span>
                        </router-link>
                    </li>
                    <li class="flex-50 center">
                        <router-link to='/connexion'>
                            <i class="fa-solid fa-right-to-bracket"></i>
                            <span>Se connecter</span>
                        </router-link>
                    </li>
                </div>
                <div class="flex direction-column" v-else>
                    <li class="flex-50 right">
                        <router-link to='/connexion'>
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <span>Surnom</span>
                        </router-link>
                    </li>
                    <li class="flex-5 center">
                        <button class="rond button-type1" v-on:click="deconnecter">
                            <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </button>
                    </li>
                    <li class="flex-40 center">
                        <p to='/utilisateur'>
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>>
                        </p>
                    </li>
                </div>
            </div>
        </ul>
    </nav>
</header>

</template>

<script>
module.exports ={
    name: 'MonHeader', 
    props:{
        connecte : {type: Boolean}, //il faut obligatoirement définir le type de props, sinon ça marche pas
        // user : {type:Object},
    },
    data () {
        return {

        }
    },
    async mounted() {
        //this.sauterAccueil()
    },
    methods: {
        afficherNavPhone(){
            var barreMenuPageContainer = document.getElementById('barre-menu-page-container')
            var barreMenuPageContainerClass = barreMenuPageContainer.getAttribute("class")

            if (barreMenuPageContainer.classList.contains('cache')) {
                let classModifie = barreMenuPageContainerClass.replace('cache', '')
                barreMenuPageContainer.setAttribute("class", classModifie)
            } else {
                barreMenuPageContainer.classList.add("cache")
            }
        },
        deconnecter(){
            this.$emit('deconnecter')
        }
    },   
    computed: {
        cheminLogo: function() {
            return this.connecte ? '/catalogue' : '/'
        },
    }

}
</script>