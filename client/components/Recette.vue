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
    <!-- recommandation de recettes -->
    <section class="flex-100 flex a-center jc-around vignette-container w100">
        <!-- <div v-for="livre in livres" :key="livre.isbn" class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r"> -->
        <div class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
            <div class="w100 center">
                <img class="w200px" src="" alt="image de recette">
            </div>
            <div>
                <h3>Nom : </h3>
                <p>CO2 : </p>
                <p>l'eau : </p>
                <p>calorie :  </p>
            </div>
            <div class="couche-livre flex direction-column jc-around a-center pad-1r w100">
                <!-- etape de cuisson -->
                <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                </ol>
            </div>
        </div>
        <div class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
            <div class="w100 center">
                <img class="w200px" src="" alt="image de recette">
            </div>
            <div>
                <h3>Nom : </h3>
                <p>CO2 : </p>
                <p>l'eau : </p>
                <p>calorie :  </p>
            </div>
            <div class="couche-livre flex direction-column jc-around a-center pad-1r w100">
                <!-- etape de cuisson -->
                <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                </ol>
            </div>
        </div>
        <div class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
            <div class="w100 center">
                <img class="w200px" src="" alt="image de recette">
            </div>
            <div>
                <h3>Nom : </h3>
                <p>CO2 : </p>
                <p>l'eau : </p>
                <p>calorie :  </p>
            </div>
            <div class="couche-livre flex direction-column jc-around a-center pad-1r w100">
                <!-- etape de cuisson -->
                <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                </ol>
            </div>
        </div>                
    </section>
  </article>

</template>

<script>
module.exports = {
    name:"Recette",
    props: {
    },
    data () {
        return {
        }
    },
    async mounted () {

    },
    updated () {
        
    },
    methods: {

    },
    computed:{

    }
}
</script>

<style scoped>
</style>