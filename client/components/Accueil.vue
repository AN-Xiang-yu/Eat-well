<template>
  <article>
    <h1 class="cache">Eat Well</h1>
    <!-- carousel -->
    <section>
        <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        >
            <b-carousel-slide v-for="img in imagesCarousel" :key="img">
                <template #img>
                <img
                    class="d-block img-fluid w-100"
                    width="1024"
                    height="480"
                    :src="'assets/image/accueil/carousel/'+img"
                    alt="image carousel"
                >
                </template>
                <h2>Eat well</h2>
            </b-carousel-slide>
        </b-carousel>
    </section>
    <section class="flex">
        <div class="flex-100 flex jc-around a-center">
            <div class="flex-40 justify mtb-inter">
               <p>Une alimentation saine permet de prévenir tous les types de malnutrition ainsi que les maladies non transmissibles telles que le diabète, les maladies cardiaques, les accidents vasculaires cérébraux et le cancer.
                    Les régimes alimentaires malsains et le manque d'activité physique sont des risques majeurs pour la santé dans le monde.</p> 
                <p>Des habitudes alimentaires saines devraient être adoptées dès le début de la vie - l'allaitement maternel favorise une croissance saine et améliore le développement cognitif, et peut également présenter des avantages durables pour la santé, tels qu'une réduction du risque de surpoids ou d'obésité plus tard dans la vie, et de maladies non transmissibles.</p>
            </div>
            <div class="flex-40">
                <img class="w100" src="assets/image/accueil/importance-nourriture-saine.jpg" alt="importance de nourriture saine">
            </div>
        </div>
        <div class="flex-100 flex jc-around a-center mtb-inter">
            <div class="flex-40">
                <img class="w100" src="assets/image/accueil/importance-nourriture-vegetarienne.jpg" alt="importance de nourriture vegetarienne">
            </div>
            <div class="flex-40 justify">
                <p>Si nous devenions tous végétariens, nous pourrions idéalement retransformer au moins 80 % de nos pâturages en prairies et en forêts, et les plantes absorberaient davantage de dioxyde de carbone, ce qui ralentirait encore le changement climatique. De nombreux grands herbivores, tels que les bisons, ont été évincés par le passé afin d'élever du bétail. En outre, des prédateurs tels que les loups ont été tués pour protéger le bétail. Par conséquent, la transformation des pâturages en habitats naturels peut également accroître la biodiversité.</p>
                <p>Les 10 à 20 % de pâturages restants peuvent être utilisés pour produire davantage de cultures et combler le déficit de l'offre alimentaire. Bien que l'augmentation des terres agricoles soit relativement faible, elle serait plus que suffisante pour compléter le régime alimentaire. En effet, environ un tiers des terres actuellement utilisées pour produire des cultures servent à faire pousser du fourrage pour le bétail, plutôt que pour la consommation humaine.</p>
            </div>
        </div>
    </section>
    <section>
        <div class="center">
            <router-link :to="cheminBouton">
                <button>
                    <span>Commencer à faire les recherches !</span>
                </button>
            </router-link>
        </div>
    </section>
  </article>
</template>

<script>
module.exports = {
    name:"Accueil",
    props: {
        connecte : {type: Boolean}, 
    },
    data () {
        return {
            slide: 0,
            sliding: null,
            imagesCarousel : ["carousel-1.jpg","carousel-2.jpg","carousel-3.jpg","carousel-4.jpg","carousel-5.jpg"]
        }
    },
    async mounted () {

    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
    },
    computed: {
        cheminBouton: function() {
            return this.connecte ? '/recettes' : '/inscription'
        },
    }
}
</script>

<style scoped>

</style>
