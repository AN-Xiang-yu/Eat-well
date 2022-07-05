<template>
  <article id="home">
    <div class="home-container">
    <h1>Items</h1>

    <!-- search display -->
    <input v-model="searchKey" id="search" type="search" placeholder="Search..." autocomplete="off">
    <span v-if="searchKey && filteredList.length >= 1 ">
      {{filteredList.length}} result<span v-if="filteredList.length >= 2">s</span>
    </span>

    <!-- cards display -->
    <div class="card-cart-container">
      <div class="card-container">
        <div v-for="product in filteredList" class="card">

          <div class="img-container">
            <img v-bind:src='product.img' />
          </div>

          <div class="card-text">
            <h3>{{ product.description }}</h3>
            <span>{{ product.calories }}g</span>
          </div>

          <div class="card-icons">
            <div class="like-container">
              
                <p>teneur en CO2:{{ product.CO2 }}</p>
                <p>Teneur en eau:{{ product.eau }}</p>
              
            </div>
          </div>

        </div>

            <!-- no result message -->
        <div v-if="filteredList.length == []" class="no-result">
          <h3>Desole</h3>
          <p>Aucun resultat ne correspondant a cette recherche</p>
        </div>
      </div>
      </div>

    </div>  

  </article>
</template>





<script>

const products = [
  { id: 1, description: "Pork chops and onions", CO2: 12, calories:50, eau:25, img: "https://media01.stockfood.com/previews/MTYzNTE3MDE2/13626418.jpg"},
  { id: 2, description: 'Curren Business', CO2: 13, calories:100, eau:105, img: "https://media01.stockfood.com/thumbs/200/71122508.jpg"},
  { id: 3, description: 'Curren Sport', CO2: 14, calories:150, eau:95, img: "https://media02.stockfood.com/thumbs/200/71122501.jpg" },
  { id: 4, description: 'Jaragar Racing', CO2: 15, calories:200, eau:85, img: "https://media02.stockfood.com/previews/ODUzMTcyNDEy/71097701.jpg" },
  { id: 5, description: 'Liges Hommes', CO2: 16, calories:250, eau:75, img: "https://media01.stockfood.com/thumbs/200/71099866.jpg"},
  { id: 6, description: 'Maserati Mechanical', CO2: 17, calories:300, eau:65, img: "https://media01.stockfood.com/thumbs/200/70428116.jpg"},
  { id: 7, description: 'Montre Mecanique', CO2: 12, calories:350, eau:55, img: "https://media01.stockfood.com/previews/ODQ0Mjc5OTky/70356666.jpg" },
  { id: 8, description: 'Brand Designer', CO2: 12, calories:450, eau:45, img: "https://media01.stockfood.com/previews/MTYzNTI0MTky/13627016.jpg"},
  { id: 9, description: 'Relogio Masculino', CO2: 18, calories:400, eau:35, img: "https://media02.stockfood.com/thumbs/200/13626487.jpg"},
  { id: 10, description: 'Tissot Multifunction', CO2: 12, calories:50, eau:25, img: "https://media01.stockfood.com/previews/MTYzNTE3MjMy/13626436.jpg"},
  { id: 11, description: 'Hip Hop Gold', CO2: 12, calories:50, eau:25, img: "https://media01.stockfood.com/previews/MTYzNTE3MjU2/13626438.jpg"},
  { id: 12, description: 'Mesh Genova', CO2: 12, calories:50, eau:25, img: "https://media02.stockfood.com/thumbs/200/13626427.jpg" },
];

module.exports = {
    name:"Recettes",
    props: {
    },
    data () {
        return {
          products, 
      searchKey: ''
        }
    },

    computed:{
       filteredList() {
      return this.products.filter((product) => {
        return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
      });
    },
    },

    async mounted () {
    },
    methods: {
    }
}
</script>

<style scoped>

</style>