<template>
    <article>
        <h1>Recettes</h1>
        <!-- barre de recherche -->
        <section>
            <!-- barre de recherche par défaut -->
            <div class="mtb-inter-inner">
                <form class="flex-nowrap a-center jc-around " >
                    <!-- barre de recherche -->
                    <div class="flex-85 flex-nowrap a-center jc-around pad-05r border-leger-noire ombreHover background-blanc">
                        <input class="search-input border-no background-blanc w80" type="search" placeholder="Chercher recettes par ingrédients" v-model="title">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <!-- bouton plus -->
                    <button class="button-type2 btn-circle btn-xl flex a-center jc-center">
                        <i class="fa-solid fa-circle-plus"></i>
                    </button>
                </form>
            </div>
            <!-- barre de recherche avancée -->
            <div class="mtb-inter-inner flex direction-column a-center">
                <!-- activer la recherche avancée -->
                <div class="w100 flex a-center mtb-inter-inner pad-1r">
                    <button id="button-recherche" class="button-type2 btn-circle btn-xl flex a-center jc-center mr-05r ml-05r">
                        <i class="fa-solid fa-circle-chevron-right"></i>
                    </button>
                    <p><span>&nbsp&nbspRecherche avancée</span></p>
                </div>
                <!-- formulaire de recherche avancée -->
                <form class="recherche-avancee-formulaire flex a-center jc-around ombreHover background-blanc border-leger-noire" >
                    <div class="flex-100 flex-nowrap a-center jc-around mtb-inter-inner">
                        <div class="flex-85 flex-nowrap a-center jc-around pad-05r ">
                            <input class="search-input border-no background-blanc w80" type="search" placeholder="Ingrédient à ne pas consommer" v-model="title">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <button class="button-type2 btn-circle btn-xl flex a-center jc-center">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                    <div class="flex-80 flex direction-column mtb-inter-inner">
                        <div>
                            <input id="sans-porc" name="sans-porc" type="checkbox" value="sans_porc" />
                            <label for="sans-porc">&nbsp&nbspSans porc</label>
                        </div>
                        <div>
                            <input id="vegane" name="vegane" type="checkbox" value="vegane" />
                            <label for="vegane">&nbsp&nbspVegane</label>
                        </div>
                        <div>
                            <input id="vegetarien" name="vegetarien" type="checkbox" value="vegetarien" />
                            <label for="vegetarien">&nbsp&nbspVégétarien</label>
                        </div>
                        <div>
                            <input id="sans-alcool" name="sans-alcool" type="checkbox" value="sans_alcool" />
                            <label for="sans-alcool">&nbsp&nbspSans alcool</label>
                        </div>
                        <div>
                            <input id="sans-gluten" name="sans-gluten" type="checkbox" value="sans_gluten" />
                            <label for="sans-gluten">&nbsp&nbspSans gluten</label>
                        </div>
                    </div>
                    <div class="flex-85 flex jc-around a-center mtb-inter-inner">
                        <p class="flex-100 spe-coleur">* Pour avoir une remarque personnelle, il faut remplir tous les informations ci-dessous : taille, poids, sexe</p>
                        <input class="flex-25 w30 border-no border-b-bleu-gros pad-05r mtb-inter-inner" type="number" step="0.01" placeholder="* Taille">
                        <input class="flex-25 w30 border-no border-b-bleu-gros pad-05r mtb-inter-inner" type="number" step="0.01" placeholder="* Poids">
                        <select class="flex-25 w30 border-b-leger-noire-gros pad-1r mtb-inter-inner background-blanc" name="" id="">
                            <option value="0">* Sexe</option>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                        </select>
                    </div>
                    <button class="button-type1 button-normal mtb-inter-inner">Reset</button>
                </form>
            </div>
            <div class="flex jc-center">
                <button type="button" class="button-type1 button-normal">Valider</button>
            </div>
        </section>
        <!-- filtrage de recherche -->
        <section>
            <div>
                <i class="fa-solid fa-filter"></i>&nbsp&nbsp
                <select class="border-b-leger-noire-gros pad-1r mtb-inter-inner background-blanc" name="" id="">
                    <option value="0" selected>Filtrage par défaut</option>
                    <option value="1">Filtrer les recettes selon son niveau de nutrion dans l'ordre croissant</option>
                    <option value="2">Filtrer les recettes selon son niveau de nutrion dans l'ordre décroissant</option>
                    <option value="3">FIltrer les recettes selon les productions de CO2 dans l'ordre croissant</option>
                    <option value="4">FIltrer les recettes selon les productions de CO2 dans l'ordre décroissant</option>
                    <option value="5">FIltrer les recettes selon les consommation de l'eau dans l'ordre croissant</option>
                    <option value="6">FIltrer les recettes selon les consommation de l'eau dans l'ordre décroissant</option>
                </select>
            </div>
        </section>
        <!-- recettes -->
        <section class="flex-100 flex a-center jc-around vignette-container w100">
            <div v-for="n in 10" :key="n" class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
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
        <!-- recette de recommandation -->
        <section class="flex-100 flex a-center jc-around vignette-container w100">
            <h2 class="flex-100">Recette de recommandation</h2>
            <div v-for="n in 6" :key="n" class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
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
    name:"Recettes",
    props: {
    },
    data () {
        return {
        }
    },
    async mounted () {
    },
    methods: {
    }
}
</script>

<style scoped>
.fa-magnifying-glass{
    font-size: 2rem;
}
.btn-circle.btn-xl {
    width: 3rem;
    height: 3rem;
    padding: 0;
    border-radius: 30px;
    font-size: 2.5rem;
    text-align: center;
}

*{
    box-sizing: initial;
}

.button-normal{
    box-sizing: border-box;
}

.border-b-leger-noire-gros {
    border-bottom: 2px var(--leger-noire) solid;
}

#button-recherche{
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
}

.recherche-avancee-formulaire{
    width:600px;
}
</style>