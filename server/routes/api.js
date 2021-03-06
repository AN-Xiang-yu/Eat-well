const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Utilisateur = require("../class/utilisateur.js");
const Recette = require("../class/recette.js");
const Ingredient = require("../class/ingredient.js");
var recettes = [];
var ingredients = [];
const NOMBRE_RECETTE_RECOMMANDATON = 10

//constant pour les indices d'imc
const DENUTRITION = 'dénutrition'
const CORPULENCE_NORMALE = 'corpulence normale'
const SURPOIDS = 'surpoids'
const OBESITE_MODEREE = 'obésité modérée'
const OBESITE_SEVERE = 'obésité sévère'
const OBESITE_MORBIDE = 'obésité morbide'

// créer l'instance Sequelize
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("eat_well", "root", "", {
    dialect: "mysql",
    host: "localhost",
});

// connecter à la base de données
try {
    sequelize.authenticate();
    console.log("connecté à la base de données MySQL !");
} catch (error) {
    console.error("Impossible de se connecter, erreur suivante :", error);
}

// créer des instances utiliser les requêtes
const utilisateur = new Utilisateur.default(sequelize);
const recette = new Recette.default(sequelize);
const ingredient = new Ingredient.default(sequelize);

function connecterSessionUtilisateur(req, res, utilisateurRecupere) {
    //connexion d'utilisateur
    req.session.utilisateur = {
        idUtilisateur: utilisateurRecupere.idUtilisateur,
        email: utilisateurRecupere.email,
        surnom: utilisateurRecupere.surnom,
    };
    res.status(201).json({
        utilisateur: req.session.utilisateur,
    });
}

async function genererRecetteRecommandation(res, idUtilisateur, iteration) {
    let idsRecettes = null
    let setIds = new Set();

    //récupérer tous les id de recettes de la table de recette
    try {
        console.log("récupérer tous les id de recettes de la table de recette");
        resultatTemp = await recette.getIdRecettes();
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({
            error: "Impossible de récupérer tous les id de recettes de la table de recette",
        });
        return;
    }

    //vérifier si l'on a bien réussi à récupérer les id de recettes
    if (resultatTemp[0].length == 0) {
        console.log("Aucune recette existe pour générer les premières recettes de recommandation");
        res.status(400).json({ message: "Aucune recette existe pour générer les premières recettes de recommandation" });
        return;
    }

    //récupérer tous les ids de recettes
    idsRecettes = resultatTemp[0]

    //choisir aléatoirement NOMBRE_RECETTE_RECOMMANDATON ids de recettes
    while (setIds.size < NOMBRE_RECETTE_RECOMMANDATON)
        setIds.add(parseInt(Math.random() * idsRecettes.length + 1))

    //ajouter ces id de recettes + id d'utilisateur dans la table (utilsateur_recette)
    for (let idRecette of setIds) {
        try {
            console.log("ajouter ces id de recettes + id d'utilisateur dans la table (utilsateur_recette)");
            resultatTemp = await recette.addRecommandation(idUtilisateur, idRecette, iteration);
        } catch (error) {
            //envoyer le message d'échec à l'utilisateur
            res.status(400).json({
                error: "Impossible d'ajouter cet id de recette + id d'utilisateur dans la table (utilsateur_recette)'",
            });
            return;
        }
    }
}

/**
 * Description : Cette fonction permet à utilisateur de s'inscrire
 * On va vérifier l'existence d'utilisateur dans la BDD, l'ajouter
 * dans la BDD, et mettre à jour la session en cas de réussite d'inscription
 * après, on va générer aléatoirement une liste de recettes de recommandation
 *
 * @param {string} email email de l'utilisateur
 * @param {string} surnom surnom de l'utilisateur
 * @param {number} mdp mot de passe de l'utilisateur
 * @return {Utilisateur} tous les informations principales d'utilisateur
 * @author author-name(Xiangyu AN) (création : 18-06-2022) (modification : 19-06-2022)
 * @état : Fini
 */
router.post("/inscription", async(req, res) => {
    //info d'un utilisateur
    const email = req.body.email
    const surnom = req.body.surnom
    const mdp = req.body.mdp
    const mdphash = await bcrypt.hash(mdp, 10); //hasher le mot de passe
    let idUtilisateur = null
    let resultatTemp = null
        // let idsRecettes = null
        // let setIds = new Set();

    //vérifier l'existence de l'utilisateur
    try {
        console.log("vérifier l'existence de l'utilisateur");
        resultatTemp = await utilisateur.exister(email, surnom);
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        console.log(error);
        res.status(400).json({
            error: "Impossible de faire la vérification d'existence de l'utilisateur",
        });
        return;
    }

    //cas d'existence de l'utilsateur
    if (resultatTemp[0].length != 0) {
        console.log("L'utilisateur existe déjà");
        res.status(400).json({ message: "L'utilisateur existe déjà" });
        return;
    }

    //ajouter l'utilisateur dans la table d'utilisateur
    try {
        console.log("ajouter l'utilisateur dans la table d'utilisateur");
        resultatTemp = await utilisateur.ajouterUtilisateur(email, surnom, mdphash);
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({
            error: "Impossible d'ajouter l'utilisateur dans la table d'utilisateur",
        });
        return;
    }

    //cas d'échec d'ajout d'un utilisateur dans la table d'utilisateur
    if (resultatTemp[0].length == 0) {
        console.log("Échoué d'ajouter l'utilsiateur dans la table d'utilisateur");
        res.status(400).json({
            message: "Échoué d'ajouter l'utilsiateur dans la table d'utilisateur",
        });
        return;
    }

    //récupérer l'id d'utilsateur qui vient d'être ajouté dans la table d'utilisateur
    idUtilisateur = parseInt(resultatTemp[0]);


    utilisateurRecupere = {
        idUtilisateur: idUtilisateur,
        email: email,
        surnom: surnom,
    };

    //générer aléatoirement une liste de recettes de recommandation
    genererRecetteRecommandation(res, idUtilisateur, 1)

    //connexion d'utilisateur
    connecterSessionUtilisateur(req, res, utilisateurRecupere);
    return;
});

/**
 * Description : Cette fonction permet à utilisateur de se connecter
 * On va vérifier l'existence d'utilisateur dans la BDD.
 * S'il existe, alors on va vérifier son mot de passe saisi
 * Si le mot de passe est bon, l'utilisateur va pouvoir se connecter
 *
 * @param {string} email_surnom email ou surnom de l'utilisateur
 * @param {number} mdp mot de passe de l'utilisateur
 * @return {Utilisateur} tous les informations principales d'utilisateur
 * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
 * @état : Fini
 */
router.post("/connexion", async(req, res) => {
    const emailSurnom = req.body.email_surnom;
    const mdp = req.body.mdp;
    let utilisateurRecupere = null;
    let resultatTemp = null;

    //récupérer l'utilisateur depuis la bd
    try {
        resultatTemp = await utilisateur.getUtilisateur(emailSurnom);
    } catch (error) {
        res.status(400).json({ error: "Échoué de connexion" });
        return;
    }

    //vérifier l'existence de l'utilisateur
    if (resultatTemp[0].length == 0) {
        console.log("L'utilisateur n'existe pas (post connexion)");
        res.status(404).json({ message: "L'utilisateur n'existe pas (post connexion)" });
        return;
    }

    //récupérer l'utilisateur
    utilisateurRecupere = resultatTemp[0][0];

    //vérifier la validation de mot de passe
    if (!(await bcrypt.compare(mdp, utilisateurRecupere.mdp))) {
        console.log("Le mot de passe de l'utilisateur n'est pas correct.");
        res
            .status(401)
            .json({ message: "Le mot de passe de l'utilisateur n'est pas correct." });
        return;
    }

    //connexion d'utilisateur
    connecterSessionUtilisateur(req, res, utilisateurRecupere);
    return;
});

/**
 * Description : Cette fonction permet de vérifier l'état de connexion de l'utilisateur
 * On va vérifier l'existence dans session
 * S'il exsite, on va utiliser son id pour récupérer ses informations et maintenir sa session
 *
 * @return {Utilisateur} tous les informations principales d'utilisateur
 * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
 * @état : Fini
 */
router.get("/connexion", async(req, res) => {
    let resultatTemp = null;
    let utilisateurRecupere = null;

    //si l'utilisateur n'est pas connecté
    if (typeof req.session.utilisateur === "undefined") {
        console.log("L'utilisateur n'est pas connecté");
        return;
    }

    //récupérer l'utilisateur par id
    try {
        resultatTemp = await utilisateur.getUtilisateurParId(
            req.session.utilisateur.idUtilisateur
        );
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({ error: "Impossible de trouver l'utilisateur" });
        return;
    }

    //vérifier l'existence de l'utilisateur
    if (resultatTemp[0].length == 0) {
        console.log("L'utilisateur n'existe pas (get connexion)");
        res.status(404).json({ message: "L'utilisateur n'existe pas (get connexion)" });
        return;
    }
    //récupérer l'utilisateur
    utilisateurRecupere = resultatTemp[0][0];

    //connexion d'utilisateur
    connecterSessionUtilisateur(req, res, utilisateurRecupere);
    return;
});

/**
 * Description : Cette fonction permet à utilisateur de se déconnecter
 * On va vérifier l'existence dans session
 * S'il exsite, on va libérer session pour déconnecter
 *
 * @return {Utilisateur} tous les informations principales d'utilisateur
 * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
 * @état : Fini
 */
router.get("/deconnexion", (req, res) => {
    //si l'utilisateur n'est pas connecté
    if (typeof req.session.utilisateur != "undefined") {
        //libérer session pour déconnecter
        req.session.destroy();

        //envoyer le message de réussite à l'utilisateur
        res.status(200).json({ message: "déconnecter" });
        return;
    }
    //envoyer le message d'erreur à l'utilisateur
    res.status(400).json({ message: "L'utilisateur n'est pas connecté" });
    return;
});

/**
 * Description : Cette fonction permet de récupérer tous les noms d'ingrédients dans BDD
 * On va récupérer les ids et les noms d'ingrédients de BDD
 * On va vérifier l'existence d'ingrédients
 *
 * @return {list<Ingredient>} une liste de tous les ingrédients dans BDD
 * @author author-name(Xiangyu AN) (création : 07-07-2022) (modification : 07-07-2022)
 * @état : Fini
 */
router.get("/nomsIngredients", async(req, res) => {
    let resultatTemp = null;
    let ingredients = null;

    //récupérer tous les ingrédients
    try {
        console.log("récupérer tous les ingrédients");
        resultatTemp = await ingredient.getNomsIngredients()
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({ error: "Impossible de récupérer tous les ingrédients" });
        return;
    }

    //vérifier l'existence des ingrédients
    if (resultatTemp[0].length == 0) {
        console.log("Aucun ingrédient trouvé");
        res.status(404).json({ message: "Aucun ingrédient trouvé" });
        return;
    }

    //récupérer les ingrédients
    ingredients = resultatTemp[0];

    res.status(201).json({
        ingredients: ingredients,
    });
    return;
});

/**
 * Description : Cette fonction permet de récupérer tous noms de recette dans BDD
 * On va récupérer tous les noms et ids de recette de BDD
 * On va vérifier l'existence de noms
 *
 * @return {list<string>} une liste de tous les noms et recettes dans BDD
 * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 07-07-2022)
 * @état : Fini
 */
router.get("/nomsRecettes", async(req, res) => {
    let resultatTemp = null;
    let recettes = null;

    //récupérer toutes les recettes
    try {
        console.log("récupérer toutes les recettes");
        resultatTemp = await recette.getNomsRecettes()
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({ error: "Impossible de récupérer toutes les recettes" });
        return;
    }

    //vérifier l'existence des recettes
    if (resultatTemp[0].length == 0) {
        console.log("Aucune recette trouvé");
        res.status(404).json({ message: "Aucune recette trouvé" });
        return;
    }

    //récupérer les ingrédients
    recettes = resultatTemp[0];

    res.status(201).json({
        recettes: recettes,
    });
    return;
});

/**
 * Description : Cette fonction permet à utilisateur de chercher les recettes en uitilisant les ingrédients,
 * les mots clés, les contraintes et les informations personnelles.
 * On va utiliser la liste de mots clés pour chercher des recettes
 * On va calculer la forme de personne et donner une remarque d'utiliser puis l'utiliser à chercher des recettes
 * On va faire une combinaison de ces quatres résultats
 * 
 * @param {list<string>} motsCles une liste de mots clés
 * @param {list<string>} motsClesANePasPrendre une liste de mots clés à ne pas prendre
 * @param {list<object>} contraintes une liste de contraintes
 * @param {int} imc indice de l'IMC personnel
 * @return {list<Recette>} une liste de recettes trouvés
 * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
 * @état : Fini
 */
router.post("/recettes", async(req, res) => {
    let resultatTemp = null;
    let mots_cles = req.body.motsCles;
    let mots_cles_a_ne_pas_prendre = req.body.motsClesANePasPrendre;
    let contraintes = req.body.contraintes;
    let imc = req.body.imc;
    let recettes = null

    console.log(mots_cles_a_ne_pas_prendre);
    //récupérer les recettes par les mots cles
    try {
        console.log("récupérer les recettes");
        resultatTemp = await recette.getRecettesParMotsCles(mots_cles, mots_cles_a_ne_pas_prendre, contraintes);
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({ error: "Impossible de trouver les recettes" });
        return;
    }

    //vérifier l'existence de recettes par les mots cles
    if (resultatTemp[0].length == 0) {
        console.log("Aucune recette trouvée par ces mots clés");
    }

    recettes = resultatTemp[0]

    //calculer les informations de nutritions de chaque recette
    for (index in recettes) {
        let ingredients = null
        let quantite = null
        let energie = null
        let lipide = null
        let sel = null
        let alcool = null
        let vitamine_A = null
        let production_CO2 = null
        let consommation_eau = null

        //récupérer tous les ingrédients de recette
        try {
            console.log("récupérer tous les ingrédients de recette");
            resultatTemp = await ingredient.getIngredientsParIdRecette(recettes[index].id_recette);
        } catch (error) {
            //envoyer le message d'échec à l'utilisateur
            res.status(400).json({
                error: "Impossible de récupérer tous les ingrédients de recette",
            });
            return;
        }

        //vérifier si l'on a bien réussi à récupérer les ingrédients
        if (resultatTemp[0].length == 0) {
            console.log("Aucun ingrédient trouvé");
            res.status(400).json({ message: "Aucun ingrédient trouvé" });
            return;
        }

        //récupérer tous les ingredients
        ingredients = resultatTemp[0]

        //calculer les quantités totales de nutrition
        ingredients.forEach(function(ingredient) {
            quantite += ingredient.quantite
            energie += ingredient.energie
            lipide += ingredient.lipide
            sel += ingredient.sel
            alcool += parseFloat(ingredient.alcool)
            vitamine_A += ingredient.vitamine_A
            production_CO2 += ingredient.production_CO2
            consommation_eau += ingredient.consommation_eau
        })

        //calculer les moyens des nutritions par 100 g/ml
        energie = energie / quantite
        lipide = lipide / quantite
        sel = sel / quantite
        alcool = alcool / quantite
        vitamine_A = vitamine_A / quantite
        production_CO2 = production_CO2 / quantite
        consommation_eau = consommation_eau / quantite

        //ajouter les moyens des nutritions dans la recette récupérée
        recettes[index].energie = energie.toFixed(2)
        recettes[index].lipide = lipide.toFixed(2)
        recettes[index].sel = sel.toFixed(2)
        recettes[index].alcool = alcool.toFixed(2)
        recettes[index].vitamine_A = vitamine_A.toFixed(2)
        recettes[index].production_CO2 = production_CO2.toFixed(2)
        recettes[index].consommation_eau = consommation_eau.toFixed(2)
    }

    //filtrer les recettes selon l'imc personnel
    if (imc == CORPULENCE_NORMALE) recettes = recettes.filter(recette => recette.energie < 700)
    if (imc == SURPOIDS) recettes = recettes.filter(recette => recette.energie < 600)
    if (imc == OBESITE_MODEREE) recettes = recettes.filter(recette => recette.energie < 500)
    if (imc == OBESITE_SEVERE) recettes = recettes.filter(recette => recette.energie < 300)
    if (imc == OBESITE_MORBIDE) recettes = recettes.filter(recette => recette.energie < 200)

    res.status(201).json({
        recettes: recettes,
    });
    return;
});

/**
 * Description : Cette fonction permet de récupérer tous les informations concernant la recette
 * On va récupérer la recette selon son id
 * On va vérifier l'existence de cette recette récupérée
 *
 * @param {int} idRecette id de recette
 * @return {Recette} une recette
 * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
 * @état : Fini
 */
router.post("/recette", async(req, res) => {
    const idRecette = req.body.idRecette
    let resultatTemp = null
    let recetteRecuperee = null
    let ingredients = null
    let quantite = null
    let energie = null
    let lipide = null
    let sel = null
    let alcool = null
    let vitamine_A = null
    let production_CO2 = null
    let consommation_eau = null


    //récupérer la recette selon son id
    try {
        console.log("récupérer la recette selon son id");
        resultatTemp = await recette.getRecetteParId(idRecette);
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({
            error: "Échouer à récupérer la recette selon son id",
        });
        return;
    }

    //vérifier si l'on a bien réussi à récupérer la recette
    if (resultatTemp[0].length == 0) {
        console.log("Aucune recette trouvée");
        res.status(400).json({ message: "Aucune recette trouvée" });
        return;
    }

    //récupérer la recette
    recetteRecuperee = resultatTemp[0]

    //récupérer tous les ingrédients de recette
    try {
        console.log("récupérer tous les ingrédients de recette");
        resultatTemp = await ingredient.getIngredientsParIdRecette(idRecette);
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({
            error: "Impossible de récupérer tous les ingrédients de recette",
        });
        return;
    }

    //vérifier si l'on a bien réussi à récupérer les ingrédients
    if (resultatTemp[0].length == 0) {
        console.log("Aucun ingrédient trouvé");
        res.status(400).json({ message: "Aucun ingrédient trouvé" });
        return;
    }

    //récupérer tous les ingredients
    ingredients = resultatTemp[0]

    //calculer les quantités totales de nutrition
    ingredients.forEach(function(ingredient) {
        quantite += ingredient.quantite
        energie += ingredient.energie
        lipide += ingredient.lipide
        sel += ingredient.sel
        alcool += parseFloat(ingredient.alcool)
        vitamine_A += ingredient.vitamine_A
        production_CO2 += ingredient.production_CO2
        consommation_eau += ingredient.consommation_eau
    })

    //calculer les moyens des nutritions par 100 g/ml
    energie = energie / quantite
    lipide = lipide / quantite
    sel = sel / quantite
    alcool = alcool / quantite
    vitamine_A = vitamine_A / quantite
    production_CO2 = production_CO2 / quantite
    consommation_eau = consommation_eau / quantite

    //ajouter les moyens des nutritions dans la recette récupérée
    recetteRecuperee[0].energie = energie.toFixed(2)
    recetteRecuperee[0].lipide = lipide.toFixed(2)
    recetteRecuperee[0].sel = sel.toFixed(2)
    recetteRecuperee[0].alcool = alcool.toFixed(2)
    recetteRecuperee[0].vitamine_A = vitamine_A.toFixed(2)
    recetteRecuperee[0].production_CO2 = production_CO2.toFixed(2)
    recetteRecuperee[0].consommation_eau = consommation_eau.toFixed(2)

    console.log(recetteRecuperee);
    res.status(201).json({
        recette: recetteRecuperee,
    });
    return;
});

/**
 * Description : Cette fonction permet de récupérer la liste de recettes recommandées
 * On va récupérer la liste de recettes recommandées selon id d'utilisateur
 * On va vérifier l'existence de cette liste de recettes récupérées
 *
 * @param {int} idUtilisateur id d'utilisateur
 * @return {list<Recette>} une recette
 * @author author-name(Xiangyu AN) (création : 07-06-2022) (modification : 07-06-2022)
 * @état : Fini
 */
router.post("/recettesRecommandation", async(req, res) => {
    //id d'un utilisateur
    const idUtilisateur = req.body.idUtilisateur
    let resultatTemp = null
    let recettes = null

    console.log(idUtilisateur);
    //récupérer tous les recettes de recommandation les plus récentes de l'utilisateur
    try {
        console.log("récupérer tous les recettes de recommandation de l'utilisateur");
        resultatTemp = await recette.getRecettesRecommandationParIdUtilisateur(idUtilisateur);
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({
            error: "Échouer à récupérer tous les recettes de recommandation de l'utilisateur",
        });
        return;
    }

    //vérifier si l'on a bien réussi à récupérer les recettes de recommandation
    if (resultatTemp[0].length == 0) {
        console.log("Aucune recette de recommandation de l'utilisateur trouvée");
        res.status(400).json({ message: "Aucune recette de recommandation de l'utilisateur trouvée" });
        return;
    }

    //récupérer tous les ids de recettes
    recettes = resultatTemp[0]

    //calculer les informations de nutritions de chaque recette
    for (index in recettes) {
        let ingredients = null
        let quantite = null
        let energie = null
        let lipide = null
        let sel = null
        let alcool = null
        let vitamine_A = null
        let production_CO2 = null
        let consommation_eau = null

        //récupérer tous les ingrédients de recette
        try {
            console.log("récupérer tous les ingrédients de recette");
            resultatTemp = await ingredient.getIngredientsParIdRecette(recettes[index].id_recette);
        } catch (error) {
            //envoyer le message d'échec à l'utilisateur
            res.status(400).json({
                error: "Impossible de récupérer tous les ingrédients de recette",
            });
            return;
        }

        //vérifier si l'on a bien réussi à récupérer les ingrédients
        if (resultatTemp[0].length == 0) {
            console.log("Aucun ingrédient trouvé");
            res.status(400).json({ message: "Aucun ingrédient trouvé" });
            return;
        }

        //récupérer tous les ingredients
        ingredients = resultatTemp[0]

        //calculer les quantités totales de nutrition
        ingredients.forEach(function(ingredient) {
            quantite += ingredient.quantite
            energie += ingredient.energie
            lipide += ingredient.lipide
            sel += ingredient.sel
            alcool += parseFloat(ingredient.alcool)
            vitamine_A += ingredient.vitamine_A
            production_CO2 += ingredient.production_CO2
            consommation_eau += ingredient.consommation_eau
        })

        //calculer les moyens des nutritions par 100 g/ml
        energie = energie / quantite
        lipide = lipide / quantite
        sel = sel / quantite
        alcool = alcool / quantite
        vitamine_A = vitamine_A / quantite
        production_CO2 = production_CO2 / quantite
        consommation_eau = consommation_eau / quantite

        //ajouter les moyens des nutritions dans la recette récupérée
        recettes[index].energie = energie.toFixed(2)
        recettes[index].lipide = lipide.toFixed(2)
        recettes[index].sel = sel.toFixed(2)
        recettes[index].alcool = alcool.toFixed(2)
        recettes[index].vitamine_A = vitamine_A.toFixed(2)
        recettes[index].production_CO2 = production_CO2.toFixed(2)
        recettes[index].consommation_eau = consommation_eau.toFixed(2)
    }

    res.status(201).json({
        recettes: recettes,
    });
    return;
});

/**
 * Description : Cette fonction permet de mettre à jour la table utilisateur_recette par la clique sur la recette de recommandation
 * On va mettre à jour la table utilisateur_recette par id de recette et id d'utilisateur
 * On va générer une nouvelle recommandaiton de 10 recettes
 *
 * @param {int} idRecette id de recette
 * @param {int} idUtilisateur id d'utilisateur
 * @param {int} iteration numéro d'iteration de recommandation de recette
 * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
 * @état : Fini
 */
router.post("/cliquerRecetteRecommandation", async(req, res) => {
    const idRecette = req.body.idRecette
    const idUtilisateur = req.body.idUtilisateur
    const iteration = parseInt(req.body.iteration)
    let resultatTemp = null
    let nouvelleIteration = iteration + 1 //le nouveau numéro d'itération de recettes de recommandation d'utilisateur

    console.log(iteration);
    //mettre à jour la table utilisateur_recette
    try {
        console.log("mettre à jour la table utilisateur_recette");
        resultatTemp = await recette.mettreAJourRecommandation(idUtilisateur, idRecette, iteration);
    } catch (error) {
        //envoyer le message d'échec à l'utilisateur
        res.status(400).json({
            error: "Échouer à mettre à jour la table utilisateur_recette",
        });
        return;
    }

    //vérifier l'existence de recette
    if (resultatTemp[0].info.indexOf("Rows matched: 1") == -1) {
        console.log("Aucune recette trouvée par cet id de recette et cet id d'utilisateur dans la base de données");
        res.status(404).json({ message: "Aucune recette trouvée par cet id de recette et cet id d'utilisateur dans la base de données" })
        return
    }

    //générer aléatoirement une liste de recettes de recommandation
    genererRecetteRecommandation(res, idUtilisateur, nouvelleIteration)

    res.status(201).json({
        message: "cliquer la recette de recommandation"
    });
    return;
});


module.exports = router;