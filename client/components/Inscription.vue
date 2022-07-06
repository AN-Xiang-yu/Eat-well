<template>
    <article class="flex direction-column jc-center a-center h100 w100">
        <h1>Inscription</h1>
        <section class="background-blanc ombreHover">
            <form class="flex direction-column jc-around w300px" @submit.prevent="inscription"  v-if="!connecte">
                <!-- surnom -->
                <input class="border-no border-b-bleu-gros pad-05r mtb-inter-inner" name="surnom" type="text" placeholder="* surnom " 
                    required v-model="utilisateur.surnom">
                <!-- email -->
                <input class="border-no border-b-bleu-gros pad-05r mtb-inter-inner" name="email" type="email" placeholder="* E-mail " 
                    required v-model="utilisateur.email">
                <!-- mdp -->
                <input class="border-no border-b-bleu-gros pad-05r mtb-inter-inner" name="mdp" type="password" placeholder="* Mot de passe"  
                    required v-model="utilisateur.mdp" pattern="[a-zA-Z0-9.,_]{8,16}" 
                    title="Le mot de passe est composé de 8 à 16 caractères et ne peut contenir que des lettres majuscules et minuscules, des chiffres ou des points, des virgules et des traits de soulignement.">
                <!-- mdp-confirme -->
                <input class="border-no border-b-bleu-gros pad-05r mtb-inter-inner" name="mdp-confirme" type="password" placeholder="* Confirmation de mot de passe" 
                    required v-model="utilisateur.mdpConfirme" v-on:blur="verifMdp()"
                    pattern="[a-zA-Z0-9.,_]{8,16}" 
                    title="Le mot de passe est composé de 8 à 16 caractères et ne peut contenir que des lettres majuscules et minuscules, des chiffres ou des points, des virgules et des traits de soulignement.">
                <!-- button -->
                <div class="pad-05r mtb-inter-inner w100 flex jc-around">
                    <button class="button-type1" type="submit">Valider</button>
                    <button class="button-type1" type="reset" v-on:click="reset">Reset</button>
                </div>
                <p class="w100 center" ><router-link to='/connexion'>Se connecter si vous avez déjà un compte</router-link></p>
                <p class="spe-coleur justify" v-text ="messageErreur"> </p>
            </form>
        </section>
    </article>
</template>

<script >

module.exports = {
    name:"Inscription",
    props: {
        connecte:{type:Boolean},
        messageErreur: {type : String},
    },
    data () {
        return {
           utilisateur: {
               email:null,
               surnom:null,
               mdp:null,
               mdpConfirme:null,
           },
        }
    },
    async mounted() {
        this.messageErreur = null
        this.sauterRecettes()
    },
    methods: {
        reset(){
            Object.keys(this.utilisateur).forEach(cle=>{this.utilisateur[cle]=null}) //vider les informations saisies
        },
        verifMdp(){
            if(!this.mdpEqual) alert('Le mot de passe saisi deux fois ne correspond pas, veuillez le saisir à nouveau.')
        },
        async inscription() {
            if(this.mdpEqual){
                this.$emit('inscription', this.utilisateur)
            }
        },
        sauterRecettes(){
            this.$emit('sauter-recettes')
        }
    },
    computed: {
        mdpEqual: function() {
            return this.utilisateur.mdp === this.utilisateur.mdpConfirme
        },
    }
}
</script>

<style scoped>

</style>
