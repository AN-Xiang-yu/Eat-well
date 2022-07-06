<template>
  <article lcass="flex direction-column a-center jc-center">
    <h1 class="center">Nom de recette</h1>
    <!-- information basique de recette -->
    <section class="flex-100 flex jc-around ">
        <div class="flex-40">
            <img class="w100" src="assets/image/recette/23053_w768h640c1cx300cy250.jpg" alt="image de recette">
        </div>
        <div class="flex-40 flex direction-column jc-around" >
            <p><span>Production de CO2 :</span></p>
            <p><span>Consommation de l'eau :</span></p>
            <p><span>Calorie (kcal) :</span></p>
            <p><span>Lipides (g) :</span></p>
            <p><span>Sel (NaCl) (g) :</span></p>
            <p><span>Alcool (g) :</span></p>
            <p><span>Activité de vitamine A, RE (µg-RE) :</span></p>
        </div>
    </section>
    <!-- liste des ingrédients -->
    <section class="flex-80">
        <h2>Liste des ingrédients :</h2>
        <div>
            <ol>
                <li>tomate</li>
                <li>tomate</li>
                <li>tomate</li>
            </ol>
        </div>
    </section>
    <!-- étape de cuisson -->
    <section class="flex-80">
        <h2>Étape de cuisson : </h2>
        <div>
            <ol>
                <li>...</li>
                <li>...</li>
                <li>...</li>
            </ol>
        </div>
    </section>
    <!-- recettes de recommandation -->
    <section class="flex-100 flex a-center jc-around vignette-container w100">
        <h2 class="flex-100">Recette de recommandation</h2>
        <div v-for="recette in recettesRecommandation" :key="recette.id_recette" class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
            <!-- image de recette -->
            <div class="w100 center">
                <img class="w200px" src="assets/image/recette/defaut.png" alt="image de recette">
            </div>
            <!-- informations principales de recette -->
            <div>
                <h3 class="center w100">{{recette.nomRecette }} </h3>
                <p>CO2 : </p>
                <p>l'eau : </p>
                <p>calorie :  </p>
            </div>
            <!-- survole - ingredients -->
            <router-link class="couche-recette flex direction-column jc-around pad-1r w100" to="/recette">
                <h4 class="w100 center">Ingrédients</h4>
                <div class="flex">
                    <ol class="mb-0">
                        <li v-for="(ingredient,index) in recette.ingredients" :key = "index" v-show="index < 5">{{ingredient}}</li>
                    </ol>
                    <p class="w100 center" v-show="(recette.ingredients.length > 4)">...... (cliquer pour voir les détails)</p>
                </div>
            </router-link>
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
    },
    data () {
        return {
        }
    },
    async mounted () {
        setTimeout(() => {this.sauterAccueil()}, 100);
        setTimeout(() => {this.consulterRecetteRecommandation()}, 200);
    },
    updated () {
        
    },
    methods: {
        async consulterRecetteRecommandation() {
            this.$emit('consulter-recette-recommandation', this.utilisateur.idUtilisateur)
        },
        sauterAccueil(){
            this.$emit('sauter-accueil')
        },
    },
    computed:{

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