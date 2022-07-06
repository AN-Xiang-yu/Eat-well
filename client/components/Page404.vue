<template>
  <article class="center">
    <h1>Page 404</h1>
    <section class="center">
        <!-- image de 404 -->
        <div>
            <img src="assets/image/page404/404_not_found.png" alt="">
        </div>
        <!-- bouton de revenir à la page d'accueil -->
        <div class="mtb-inter">
            <router-link to='/'>
                <button class="button-type1 w-auto m-auto">
                    Revenir à la page d'accueil
                </button>
            </router-link>
        </div>
    </section>

  </article>
</template>

<script>
module.exports = {
    name:"Page404",
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
img{
    width: 600px;
}
</style>