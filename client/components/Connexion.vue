<template>
    <article class="flex direction-column jc-center a-center h100 w100">
        <h1>Connexion</h1>
        <section class="background-blanc ombreHover">
            <form id='formulaire-connexion' class="flex direction-column jc-around w300px" @submit.prevent="connecter" v-if="!connecte">
                <!-- email ou surnom -->
                <input class="border-no border-b-bleu-gros pad-05r mtb-inter-inner" name="email-numetu" type="text" placeholder="* E-mail ou surnom " 
                    required v-model="utilisateur.email_surnom">
                <!-- mdp -->
                <input class="border-no border-b-bleu-gros pad-05r mtb-inter-inner"  name="password" type="password" placeholder="* Mot de passe" pattern="[a-zA-Z0-9.,_]{8,16}" 
                    required v-model="utilisateur.mdp" 
                    title="Le mot de passe est composé de 8 à 16 chiffres et ne peut contenir que des lettres majuscules et minuscules, des chiffres ou des points, des virgules et des traits de soulignement.">
                <div class="w100 center flex jc-around">
                    <button class="button-type1" type="submit">Se connecter</button>
                    <button class="button-type1" type="reset" v-on:click="reset">Reset</button>
                </div>
                <p class="w100 center" ><router-link to='/inscription'>S'inscrire si vous n'avez pas de compte</router-link></p>
                <p class="spe-coleur justify" v-text ="messageErreur"> </p>
                <p class="an"></p>
            </form>
        </section>
    </article>
</template>

<script>

module.exports ={
    name: 'Login', 
    props: {
       messageErreur : {type : String},
       connecte: {type: Boolean},
    },
    data () {
        return {
            utilisateur: { 
                email_surnom:null,
                mdp:null 
            },
        }
    },
    async mounted() {
        this.messageErreur = null
        this.sauterRecettes()
    },
    methods: {
        reset(){
            this.utilisateur.email_surnom = null
            this.utilisateur.mdp = null
        },
        async connecter() {
            this.$emit('connecter', this.utilisateur)
        },
        sauterRecettes(){
            this.$emit('sauter-recettes')
        }
    }
}
</script>

<style scoped>
#formulaire-connexion{
    height: 300px;
}
</style>
