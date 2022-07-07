<template>
  <article lcass="flex direction-column a-center jc-center" v-if="charge">
    <h1 class="center" >{{recette.nom}}</h1>
    <!-- information basique de recette -->
    <section class="flex-100 flex jc-around">
        <div class="flex-40">
            <img class="w100" :src="recette.image" alt="image de recette">
        </div>
        <div class="flex-40 flex direction-column jc-around" >
            <p><b>Type :</b> {{ recette.type}}</p>
            <p><b>Production de CO2 :</b>{{ recette.production_CO2}}</p>
            <p><b>Consommation de l'eau :</b>{{ recette.consommation_eau}}</p>
            <p><b>Calorie (kcal) :</b>{{ recette.energie}}</p>
            <p><b>Lipides (g) :</b>{{ recette.lipide}}</p>
            <p><b>Sel (NaCl) (g) :</b>{{ recette.sel}}</p>
            <p><b>Alcool (g) :</b>{{ recette.alcool}}</p>
            <p><b>Activité de vitamine A, RE (µg-RE) :</b>{{ recette.vitamine_A}}</p>
        </div>
    </section>
    <!-- liste des ingrédients -->
    <section class="flex-80">
        <h2>Liste des ingrédients :</h2>
        <div>
            <ol>
                <li v-for="(ingredient,index) in recette.ingredients" :key = "index">{{ingredient}}</li>
            </ol>
        </div>
    </section>
    <!-- étape de cuisson -->
    <section class="flex-80">
        <h2>Étape de cuisson : </h2>
        <div>
            <ol>
                <li v-for="(etape,index) in recette.etapes" :key = "index" v-show="index != recette.etapes.length - 1">{{etape}}</li>
            </ol>
        </div>
    </section>
    <!-- recettes de recommandation -->
    <section class="flex-100 flex a-center jc-around vignette-container w100">
        <h2 class="flex-100">Recette de recommandation</h2>
        <div v-for="recette in recettesRecommandation" :key="recette.id_recette" class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
            <!-- image de recette -->
                <div class="w100 center">
                    <img 
                    :class="imageRecetteNulle(recette.image) ? 'w200px': 'w75'" 
                    :src="imageRecetteNulle(recette.image) ? 'assets/image/recette/defaut.png' : recette.image" 
                    alt="image de recette">
                </div>
            <!-- informations principales de recette -->
            <div class="w100">
                <h3 class="center w100">{{recette.nomRecette }} </h3>
                <p>CO2 : </p>
                <p>l'eau : </p>
                <p>calorie :  </p>
            </div>
            <!-- survole - ingredients -->
            <div class="couche-recette flex direction-column jc-around pad-1r w100 cr-pointer" 
                @click="cliquerRecetteRecommandation(recette.id_recette, recette.iteration)">
                <h4 class="w100 center">Ingrédients</h4>
                <div class="flex">
                    <ol class="mb-0">
                        <li v-for="(ingredient,index) in recette.ingredients" :key = "index" v-show="index < 5">{{ingredient}}</li>
                    </ol>
                    <p class="w100 center" v-show="(recette.ingredients.length > 4)">...... (cliquer pour voir les détails)</p>
                </div>
            </div>
        </div>
    </section>
  </article>

</template>

<script>
module.exports = {
    name:"Recette",
    props: {
        utilisateur : {type:Object},
        recettesRecommandation : {type:Array},
        connecte: {type: Boolean},
        recette : {type:Object},
    },
    data () {
        return {
        }
    },
    async mounted () {
        setTimeout(() => {this.sauterAccueil()}, 100)
        this.consulterRecette()
        setTimeout(() => {this.consulterRecettesRecommandation()}, 200)
    },
    methods: {
        //sauter à la page d'accueil si l'on n'est pas connecté
        sauterAccueil(){
            this.$emit('sauter-accueil')
        },
        //récupérer les recettes de recommandation
        async consulterRecettesRecommandation() {
            this.$emit('consulter-recettes-recommandation', {idUtilisateur : this.utilisateur.idUtilisateur})
        },
        //récupérer la recette
        async consulterRecette() {
            this.$emit('consulter-recette', {idRecette :  this.$route.params.id})
        },
        //cliquer une recette de recommandation
        async cliquerRecetteRecommandation(idRecette, iteration) {
            this.$emit('cliquer-recette-recommandation', {idRecette :  idRecette, idUtilisateur :  this.utilisateur.idUtilisateur, iteration :  iteration})
            this.$router.push({path:'/recette/'+idRecette})
            location.reload() //rafraichir la page pour mettre à jour les modifications
        },
        imageRecetteNulle(image){
            return  image == null 
        },

    },
    computed:{
        charge(){ //le chargement des informations de la recette
            return !(this.recette == undefined )
        },
    }
}
</script>

<style scoped>
/* recettes */
.vignette:hover .couche-recette {
    display: flex;
}

.vignette {
    position:relative
}
.couche-recette {
    display: none;
    position:absolute;
    height: 100%;
    top:0;
    background-color: var(--color2);
    z-index: 9;
    width:100%;
    opacity: 0.8;
    color:white
}
</style>