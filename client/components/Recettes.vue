<template>
    <article>
        <h1>Recettes</h1>
        <!-- barre de recherche -->
        <section>
            <!-- barre de recherche par défaut -->
            <div class="flex jc-around mtb-inter-inner">
                <form class="flex-90 flex-nowrap a-center jc-around pad-05r border-leger-noire ombreHover background-blanc" >
                    <input class="search-input border-no background-blanc  w80" type="search" placeholder="Chercher recettes par ingrédients" v-model="title">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </form>
                <button class="button-type2 btn-circle btn-xl center">
                    <i class="fa-solid fa-circle-plus"></i>
                </button>
            </div>
            <!-- barre de recherche avancée -->
            <div></div>
            <div class="flex jc-center">
                <button type="button" class="button-type1 valider">Valider</button>
            </div>
        </section>
        <!-- filtrage de recherche -->
        <section>
            
        </section>
        <!-- recettes -->
        <section></section>
        <!-- recette de recommandation -->
        <section></section>
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
    font-size: 40px;
}
.btn-circle.btn-xl {
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 30px;
    font-size: 40px;
    text-align: center;
}

*{
    box-sizing: initial;
}

.valider{
    box-sizing: border-box;
}
</style>