<template>
  <article class="center">
    <h1>Page 404</h1>
    <section class="center">
        <img src="assets/image/page404/404_not_found.png" alt="">
    </section>
    <router-link to='/'>
        <button>
            Revienir à la page d'accueil
        </button>
    </router-link>
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