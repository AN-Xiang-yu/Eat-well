const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Utilisateur = require("../class/utilisateur.js");
const Recette = require("../class/recette.js");
const Ingredient = require("../class/ingredient.js");
var recettes = [];
var ingredients = [];

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
    idUtilisateur: utilisateurRecupere.id,
    email: utilisateurRecupere.email,
    surnom: utilisateurRecupere.surnom,
  };
  res.status(201).json({
    utilisateur: req.session.utilisateur,
  });
}

/**
 * Description : Cette fonction permet à utilisateur de s'inscrire
 * On va vérifier l'existence d'utilisateur dans la BDD, l'ajouter
 * dans la BDD, et mettre à jour la session en cas de réussite d'inscription
 * après, on va générer aléatoirement une liste de recette
 *
 * @param {string} email email de l'utilisateur
 * @param {string} surnom surnom de l'utilisateur
 * @param {number} mdp mot de passe de l'utilisateur
 * @return {Utilisateur} tous les informations principales d'utilisateur
 * @author author-name(Xiangyu AN) (création : 18-06-2022) (modification : 19-06-2022)
 * @état : non fini, la partie générer aléatoirement une liste de recette à faire
 */
router.post("/inscription", async (req, res) => {
  //info d'un utilisateur
  const email = req.body.email;
  const surnom = req.body.surnom;
  const mdp = req.body.mdp;
  const mdphash = await bcrypt.hash(mdp, 10); //hasher le mot de passe
  let idUtilisateur = null;
  let resultatTemp = null;

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

  /* ******************************************* */
  //A FAIRE: générer une recommandaiton de 10 recettes
  //1. récupérer tous les id de recettes de la table de recette
  //2. vérifier si l'on a bien réussi à récupérer les id de recettes
  //3. choisir aléatoirement 10 id de recettes
  //4. ajouter ces id de recettes + id d'utilisateur dans la table (utilsateur_recette)
  /* ******************************************* */

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
 * @état : fini
 */
router.post("/connexion", async (req, res) => {
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
    console.log("L'utilisateur n'existe pas");
    res.status(404).json({ message: "L'utilisateur n'existe pas" });
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
 * @état : fini
 */
router.get("/connexion", async (req, res) => {
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
    console.log("L'utilisateur n'existe pas");
    res.status(404).json({ message: "L'utilisateur n'existe pas" });
    return;
  }

  utilisateurRecupere = resultatTemp[0][0]; //récupérer l'utilisateur

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
 * @état : fini
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

module.exports = router;
