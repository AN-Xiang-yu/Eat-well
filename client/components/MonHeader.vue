<template>
<header>
    <nav class="border-b-bleu majuscule background-main-color" >
        <ul class="flex a-center jc-between w90 m-auto">
            <div class="flex jc-between a-center barre-menu-image-container">
                <!-- logo du site -->
                <li class="flex-10">
                    <div class="flex jc-center">
                        <router-link :to='cheminLogo'>
                            <img class="barre-menu-image mt-025r" src="../assets/image/commun/logo.png" alt="logo de site">
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
            <!-- Mode non connexion : inscription et connexion en écran de taille grande -->
            <div id="barre-menu-page-container-grand-ecran" class="flex-25 flex jc-between a-center f-700" v-if="!connecte">
                <li class="flex-50 center">
                    <router-link to='/inscription'>
                        <button class="button-type1">
                            <i class="fa-solid fa-user-plus"></i>
                            <span>&nbsp&nbspS'inscrire</span>
                        </button>
                    </router-link>
                </li>
                <li class="flex-50 center">
                    <router-link to='/connexion'>
                        <button class="button-type1 w-auto">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            <span>&nbsp&nbspSe connecter</span>
                        </button>
                    </router-link>
                </li>
            </div>
            <!-- Mode connexion : recettes et surnom en écran de taille grande -->
            <div id="barre-menu-page-container-grand-ecran" class="flex-85 flex jc-between a-center f-700" v-else>
                <li class="flex-50 left">
                    <router-link to='/recettes'>
                        <button class="button-type1">
                            <i class="fa-solid fa-utensils"></i>
                            <span>&nbsp&nbspRecettes</span>
                        </button>

                    </router-link>
                </li>
                <li class="flex-40 right">
                    <router-link to='/connexion'>
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <span>{{utilisateur.surnom}}</span>     
                    </router-link>
                </li>
                <li class="flex-5 center">
                    <button class="rond button-type1" v-on:click="deconnecter">
                        <i class="fa-solid fa-power-off"></i>
                    </button>
                </li>
            </div>
            <!-- navigation en écran de taille petite -->
            <div id="barre-menu-page-container" class="flex-90 m-auto cache f-700">
                <!-- Mode non connexion -->
                <div class="flex direction-column a-center" v-if="!connecte">
                    <li class="flex-50 center">
                        <router-link to='/inscription'>
                            <button class="button-type1">
                                <i class="fa-solid fa-user-plus"></i>
                                <span>&nbsp&nbspS'inscrire</span>
                            </button>
                        </router-link>
                    </li>
                    <li class="flex-50 center">
                        <router-link to='/connexion'>
                            <button class="button-type1">
                                <span>Se connecter</span>
                                <i class="fa-solid fa-right-to-bracket"></i>
                            </button>
                        </router-link>
                    </li>
                </div>
                <!-- Mode connexion -->
                <div class="flex direction-column" v-else>
                    <li class="flex-50 center">
                        <router-link to='/recettes'>
                            <button class="button-type1">
                                <i class="fa-solid fa-utensils"></i>
                                <span>Recettes</span>
                            </button>
                            
                        </router-link>
                    </li>
                    <li class="flex-50 center">
                        <router-link to='/connexion'>
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <span>{{utilisateur.surnom}}</span>
                        </router-link>
                    </li>
                    <li class="flex-50 m-auto">
                        <button class="rond button-type1" v-on:click="deconnecter">
                            <i class="fa-solid fa-power-off"></i>
                        </button>
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
        connecte : {type: Boolean}, 
        utilisateur : {type:Object},
    },
    data () {
        return {

        }
    },
    async mounted() {
        
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
            return this.connecte ? '/recettes' : '/'
        },
    }

}
</script>