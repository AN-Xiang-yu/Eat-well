<template>
    <article>
        <h1>Recettes</h1>
        <!-- barre de recherche -->
        <section>
            <!-- barre de recherche par défaut -->
            <div class="mtb-inter-inner">
                <form id="recherche-ingredient" @submit.prevent>
                    <div class="flex-nowrap a-center jc-around mtb-inter-inner" v-for="(motCleAPrendre, index) in motsClesAPrendre" :key="index">
                        <!-- barre de recherche -->
                        <div class="flex-75 flex-nowrap a-center jc-around pad-05r border-leger-noire ombreHover background-blanc">
                                <input class="search-input border-no background-blanc w80" placeholder="Chercher par nom d'ingrédient ou nom de recette" list="liste-mots-cles-a-prendre" v-model="motsClesAPrendre[index]">
                                <datalist id="liste-mots-cles-a-prendre">
                                    <option v-for="(ingredient,idx) in ingredients" :key="idx" :value="ingredient.nomIngredient"></option>
                                    <option v-for="recette in recettes" :key="recette.nomRecette" :value="recette.nomRecette"></option>
                                </datalist>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <!-- bouton plus -->
                        <button class="button-type2 btn-circle btn-xl flex a-center jc-center" @click="ajouterNouvelIngredient(motsClesAPrendre)">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <!-- bouton moins -->
                        <button class="button-type2 btn-circle btn-xl flex a-center jc-center" @click="supprimerIngredient(motsClesAPrendre, index)">
                            <i class="fa-solid fa-circle-minus"></i>
                        </button>
                    </div>
                </form>
            </div>
            <!-- barre de recherche avancée -->
            <div class="mtb-inter-inner">
                <!-- activer la recherche avancée -->
                <div class="m-auto w70 flex a-center mtb-inter-inner pad-1r">
                    <button id="button-recherche" class="button-type2 btn-circle btn-xl flex a-center jc-center mr-05r ml-05r" @click="changerAffichageRechercheAvancee()">
                        <i :class="{'fa-solid ' : true, 'fa-circle-chevron-down' : affichageRechercheAvancee === true, 'fa-circle-chevron-right' : affichageRechercheAvancee === false}"></i>
                    </button>
                    <label for="button-recherche">&nbsp&nbspRecherche avancée</label>
                </div>
                <!-- formulaire de recherche avancée -->
                <transition name="slide-fade">
                    <form class="recherche-avancee-formulaire m-auto flex a-center jc-around ombreHover background-blanc border-leger-noire pad-1r" @submit.prevent v-show="affichageRechercheAvancee">
                        <div class="flex-100 flex-nowrap a-center jc-around mtb-inter-inner" v-for="(motCleANePasPrendre, index) in motsClesANePasPrendre" :key="index">
                            <!-- barre de recherche -->
                            <div class="flex-75 flex-nowrap a-center jc-around pad-05r border-leger-noire ombreHover background-blanc">
                                <input class="search-input border-no background-blanc w80" type="search" placeholder="Ingrédient ou recette à ne pas consommer" list="liste-mots-cles-a-ne-pas-prendre" v-model="motsClesANePasPrendre[index]">
                                <datalist id="liste-mots-cles-a-ne-pas-prendre">
                                    <option v-for="(ingredient,idx) in ingredients" :key="idx" :value="ingredient.nomIngredient"></option>
                                    <option v-for="recette in recettes" :key="recette.nomRecette" :value="recette.nomRecette"></option>
                                </datalist>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <!-- bouton plus -->
                            <button class="button-type2 btn-circle btn-xl flex a-center jc-center" @click="ajouterNouvelIngredient(motsClesANePasPrendre)">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <!-- bouton moins -->
                            <button class="button-type2 btn-circle btn-xl flex a-center jc-center" @click="supprimerIngredient(motsClesANePasPrendre, index)">
                                <i class="fa-solid fa-circle-minus"></i>
                            </button>
                        </div>
                        <div class="flex-80 flex direction-column mtb-inter-inner">
                            <!-- sans porc -->
                            <div>
                                <input id="sans-porc" name="sans-porc" type="checkbox" v-model="listeContraintes.sansProc" />
                                <label for="sans-porc">&nbsp&nbspSans porc</label>
                            </div>
                            <!-- vegane -->
                            <div>
                                <input id="vegane" name="vegane" type="checkbox" v-model="listeContraintes.vegane"/>
                                <label for="vegane">&nbsp&nbspVegane</label>
                            </div>
                            <!-- végétarien -->
                            <div>
                                <input id="vegetarien" name="vegetarien" type="checkbox" v-model="listeContraintes.vegetarien"/>
                                <label for="vegetarien">&nbsp&nbspVégétarien</label>
                            </div>
                            <!-- sans alcool -->
                            <div>
                                <input id="sans-alcool" name="sans-alcool" type="checkbox" v-model="listeContraintes.sansAlcool"/>
                                <label for="sans-alcool">&nbsp&nbspSans alcool</label>
                            </div>
                            <!-- sans gluten -->
                            <div>
                                <input id="sans-gluten" name="sans-gluten" type="checkbox" v-model="listeContraintes.sansGluten"/>
                                <label for="sans-gluten">&nbsp&nbspSans gluten</label>
                            </div>
                        </div>
                        <!-- indice personnelle -->
                        <div class="flex-85 flex jc-around a-center mtb-inter-inner">
                            <p class="flex-100 spe-coleur">* Pour avoir une remarque personnelle, il faut remplir tous les informations ci-dessous : taille, poids, sexe</p>
                            <!-- taiile -->
                            <input class="flex-25 w30 border-no border-b-bleu-gros pad-05r mtb-inter-inner" type="number" step="0.01" placeholder="* Taille (cm)" v-model="infosPersonnelles.taille">
                            <!-- poids -->
                            <input class="flex-25 w30 border-no border-b-bleu-gros pad-05r mtb-inter-inner" type="number" step="0.01" placeholder="* Poids (kg)" v-model="infosPersonnelles.poids">
                            <!-- sexe -->
                            <input class="flex-25 w30 border-no border-b-bleu-gros pad-05r mtb-inter-inner" placeholder="* Sexe" v-model="infosPersonnelles.sexe" list="recherche-avancee-sexe">
                            <datalist id="recherche-avancee-sexe" class="flex-25 w30 border-b-leger-noire-gros pad-1r mtb-inter-inner background-blanc">
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </datalist>
                            <!-- retour d'informations personnelles -->
                            <p>Votre socore IMC est : <span>{{noteImc}}</span></p>
                            <p>Votre indice de masse corporelle est : <span>{{imc}}</span></p>
                        </div>
                        <!-- reset -->
                        <button type="reset" class="button-type1 button-normal mtb-inter-inner">Reset</button>
                    </form>
                </transition>
                
            </div>
            <div class="flex jc-center">
                <button type="button" class="button-type1 button-normal" @click="chercherRecettes()">Valider</button>
            </div>
        </section>
        <!-- filtrage de recherche -->
        <section>
            <div>
                <i class="fa-solid fa-filter"></i>&nbsp&nbsp
                <select  id="filtrage" class="border-b-leger-noire-gros pad-1r mtb-inter-inner background-blanc" name="filtrage" v-model="filtrage">
                    <option value="0">Filtrer par défaut</option>
                    <option value="1">FIltrer les recettes selon les productions de CO2 dans l'ordre croissant</option>
                    <option value="2">FIltrer les recettes selon les productions de CO2 dans l'ordre décroissant</option>
                    <option value="3">FIltrer les recettes selon les consommation de l'eau dans l'ordre croissant</option>
                    <option value="4">FIltrer les recettes selon les consommation de l'eau dans l'ordre décroissant</option>
                    <option value="5">FIltrer les recettes selon la calorie dans l'ordre croissant</option>
                    <option value="6">FIltrer les recettes selon la calorie dans l'ordre décroissant</option>
                </select>
            </div>
        </section>
        <!-- recettes -->
        <section class="flex-100 flex a-center jc-around vignette-container w100">
            <p class="flex-100 center spe-coleur">{{messageRechercheRecette}}</p>
            <div v-for="recette in recettesTrouveesFiltrees" :key="recette.id_recette" class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
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
                    <p>CO2 : {{recette.production_CO2}}</p>
                    <p>l'eau : {{recette.consommation_eau}}</p>
                    <p>calorie :  {{recette.energie}}</p>
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
        <!-- recettes de recommandation -->
        <section class="flex-100 flex a-center jc-around vignette-container w100">
            <h2 class="flex-100">Recettes de recommandation</h2>
            <div v-for="recette in recettesRecommandationFiltrees" :key="recette.id_recette" class="height500 vignette flex direction-column jc-between a-center border-leger-noire ombreHover pad-1r">
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
                    <p>CO2 : {{recette.production_CO2}}</p>
                    <p>l'eau : {{recette.consommation_eau}}</p>
                    <p>calorie :  {{recette.energie}}</p>
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
    name:"Recettes",
    props: {
        utilisateur : {type:Object},
        recettesRecommandation : {type:Array},
        connecte : {type: Boolean},
        ingredients : {type:Array},
        recettes : {type:Array},
        recettesTrouvees : {type:Array},
    },
    data () {
        return {
            motsClesAPrendre : [""],
            affichageRechercheAvancee : false,
            motsClesANePasPrendre : [""],
            listeContraintes : {
                sansProc : false,
                vegane : false,
                vegetarien : false,
                sansAlcool : false,
                sansGluten : false,
            },
            infosPersonnelles:{
                taille : null,
                poids : null,
                sexe : null,
                imc : this.imc
            },
            filtrage : '0',
            content : null,
            messageRechercheRecette : "Vous pouvez saisir dans la barre de recherche pour trouver les recettes"
        }
    },
    async mounted () {
        setTimeout(() => {this.sauterAccueil()}, 50);
        setTimeout(() => {this.consulterRecettesRecommandation()}, 300);
        setTimeout(() => {this.recupererNomsIngredients()}, 300);
        setTimeout(() => {this.recupererNomsRecettes()}, 300);
    },
    methods: {
        //sauter à la page d'accueil si l'on n'est pas connecté
        sauterAccueil(){
            this.$emit('sauter-accueil')
        },
        //ajouter un nouvel ingrédient
        ajouterNouvelIngredient(listIngredients){
            listIngredients.push("")
        },
        //suppirmer l'ingrédient choisi
        supprimerIngredient(listIngredients, index){
            if(index != 0) listIngredients.splice(index, 1)
            else this.$set(listIngredients, index, "")
        },
        //changer l'état de recherche avancée
        changerAffichageRechercheAvancee(){
            this.affichageRechercheAvancee = !this.affichageRechercheAvancee
        },
        //récupérer tous les ingrédients
        async recupererNomsIngredients() {
            this.$emit('recuperer-noms-ingredients')
        },
        //récupérer tous les recettes
        async recupererNomsRecettes() {
            this.$emit('recuperer-noms-recettes')
        },
        //chercher les recettes
        async chercherRecettes() {
            this.$emit('chercher-recettes',{motsCles:this.motsClesAPrendre, 
                                            motsClesANePasPrendre:this.motsClesANePasPrendre, 
                                            contraintes:this.listeContraintes,
                                            imc : this.imc})
             setTimeout(() => {
                if (this.recettesTrouvees == null)
                    this.messageRechercheRecette = "Aucune recette trouvée" 
                else
                    this.messageRechercheRecette = "On a trouvé " + this.recettesTrouvees.length + " recette(s)."
                    }, 1000);

        },
        //récupérer les recettes de recommandation
        async consulterRecettesRecommandation() {
            this.$emit('consulter-recettes-recommandation', {idUtilisateur : this.utilisateur.idUtilisateur})
        },
        //cliquer une recette de recommandation
        async cliquerRecetteRecommandation(idRecette, iteration) {
            this.$emit('cliquer-recette-recommandation', {idRecette :  idRecette, idUtilisateur :  this.utilisateur.idUtilisateur, iteration : iteration})
            this.$router.push({path:'/recette/'+idRecette})
        },
        //vérifier si l'image de la recette existe ou non
        imageRecetteNulle(image){
            return  image == null 
        },
        
    },
    computed: {
        // La note d'imc
        noteImc(){
            if(this.infosPersonnelles.taille != null 
            && this.infosPersonnelles.taille != 0
            && this.infosPersonnelles.poids != null 
            && this.infosPersonnelles.poids != 0
            && this.infosPersonnelles.sexe != null){
                return (this.infosPersonnelles.poids / ((this.infosPersonnelles.taille/100)*(this.infosPersonnelles.taille/100))).toFixed(2)
            }
            else
                return ''
        },
        // l'indice d'imc
        imc(){
            if(this.noteImc != ''){
                if(this.noteImc < 18.5)
                    return 'dénutrition'
                if(this.noteImc < 25)
                    return 'corpulence normale'
                if(this.noteImc < 30)
                    return 'surpoids'
                if(this.noteImc < 35)
                    return 'obésité modérée'
                if(this.noteImc < 40)
                    return 'obésité sévère'
                if(this.noteImc >= 40)
                    return 'obésité morbide'
            }
            return ''
        },
        recettesRecommandationFiltrees(){
            let numFiltrage = parseInt(this.filtrage)
            if(numFiltrage == 0) return this.recettesRecommandation
            if(numFiltrage == 1) 
                return [...this.recettesRecommandation].sort(function(a,b){
                    return a.production_CO2 - b.production_CO2;
                })
            if(numFiltrage == 2) 
                return [...this.recettesRecommandation].sort(function(a,b){
                    return b.production_CO2 - a.production_CO2;
                })
            if(numFiltrage == 3) 
                return [...this.recettesRecommandation].sort(function(a,b){
                    return a.consommation_eau - b.consommation_eau;
                })
            if(numFiltrage == 4) 
                return [...this.recettesRecommandation].sort(function(a,b){
                    return b.consommation_eau - a.consommation_eau;
                })
            if(numFiltrage == 5) 
                return [...this.recettesRecommandation].sort(function(a,b){
                    return a.energie - b.energie;
                })
            if(numFiltrage == 6) 
                return [...this.recettesRecommandation].sort(function(a,b){
                    return b.energie - a.energie;
                })
        },
        recettesTrouveesFiltrees(){
            if(this.recettesTrouvees == null){
                return this.recettesTrouvees
            } else {
                let numFiltrage = parseInt(this.filtrage)
                if(numFiltrage == 0) return this.recettesTrouvees
                if(numFiltrage == 1) 
                    return [...this.recettesTrouvees].sort(function(a,b){
                        return a.production_CO2 - b.production_CO2;
                    })
                if(numFiltrage == 2) 
                    return [...this.recettesTrouvees].sort(function(a,b){
                        return b.production_CO2 - a.production_CO2;
                    })
                if(numFiltrage == 3) 
                    return [...this.recettesTrouvees].sort(function(a,b){
                        return a.consommation_eau - b.consommation_eau;
                    })
                if(numFiltrage == 4) 
                    return [...this.recettesTrouvees].sort(function(a,b){
                        return b.consommation_eau - a.consommation_eau;
                    })
                if(numFiltrage == 5) 
                    return [...this.recettesTrouvees].sort(function(a,b){
                        return a.energie - b.energie;
                    })
                if(numFiltrage == 6) 
                    return [...this.recettesTrouvees].sort(function(a,b){
                        return b.energie - a.energie;
                    })
            }
        },

    }
}
</script>

<style scoped>
/* input */
.border-b-leger-noire-gros {
    border-bottom: 2px var(--leger-noire) solid;
}

/* barre de recherche */
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

/* bouton recherche */
#button-recherche{
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
}

/* recherche avancée */
.recherche-avancee-formulaire{
    width:600px;
}

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


::marker{
    display: none;
}
</style>