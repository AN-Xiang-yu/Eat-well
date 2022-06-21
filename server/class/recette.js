class Recette {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    /**
     * Description : Cette fonction permet de récupérer les informations d'un nombre de recette donnée
     * On peut prendre aléatoirement les recettes en générer des id avec random
     * ou bien on peut rendre les permières/dernirères recettes
     *
     * @param {int} nbrRecette email ou surnom de l'utilisateur
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : ??-06-2022)
     * @return {Recette} Une liste de recettes
     * @état : fait
     */
    async getRecettesNbr(nbrRecette) {
        return this.sequelize
            .query(
                `SELECT * FROM recette LIMIT :nbrRecette
            `, {
                    replacements: { nbrRecette: nbrRecette },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /** !!!!!!!!!! A REVOIR AVEC LE GROUPE
     * Description : Cette fonction permet de récupérer les recettes selon les ids d'ingrédients
     *
     * @param {List<int>} ingredients une liste d'ids d'ingrédients
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
     * @return {Recette} Une liste de recettes
     * @état : A FAIRE
     */
    async getRecettesParIngredients(ingredients) {
        return this.sequelize
            .query(
                `SELECT *
                FROM recettes
                WHERE ............ `, {
                    // replacements: {...: ... },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /** !!!!!!!!!! A REVOIR AVEC LE GROUPE
     * Description : Cette fonction permet de récupérer les recettes selon les mots clées
     *
     * @param {List<string>} mots_cles une liste de string (tags ou nom de recettes)
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
     * @return {Recette} Une liste de recettes
     * @état : A FAIRE
     */
    async getRecettesParMotsCles(mots_cles) {
        return this.sequelize
            .query(
                `SELECT *
                FROM recettes
                WHERE ............ `, {
                    // replacements: {...: ... },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /** !!!!!!!!!! A REVOIR AVEC LE GROUPE
     * Description : Cette fonction permet de récupérer les recettes selon les contraintes
     *
     * @param {List<object>} contraintes une liste de contraintes
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
     * @return {Recette} Une liste de recettes
     * @état : A FAIRE
     */
    async getRecettesParContraintes(contraintes) {
        return this.sequelize
            .query(
                `SELECT *
                FROM recettes
                WHERE ............ `, {
                    // replacements: {...: ... },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /** !!!!!!!!!! A REVOIR AVEC LE GROUPE
     * Description : Cette fonction permet de récupérer les recettes selon la remarque sur la forme personnelle
     *
     * @param {string} remarquePerso une remarque sur la forme personnelle
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
     * @return {Recette} Une liste de recettes
     * @état : A FAIRE
     */
    async getRecettesParRemarquePerso(remarquePerso) {
        return this.sequelize
            .query(
                `SELECT *
                FROM recettes
                WHERE ............ `, {
                    // replacements: {...: ... },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /** !!!!!!!!!! A REVOIR AVEC LE GROUPE
     * Description : Cette fonction permet de récupérer les informations avec selon les entrées
     *
     * @param {List<String>} listeString une liste de string (ingrédients ou tags ou nom de recettes)
     * @param {contraintes} contraintes une liste de contraintes
     * @param {int} notePersonnelle une note personnelle calculée en fonction de sa taille, poids et sexe
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
     * @return {Recette} Une liste de recettes
     * @état : A FAIRE
     */
    async getRecettesRecherchees(listeIngredients, contraintes, notePersonnelle) {
        return this.sequelize
            .query(
                `SELECT *
                FROM recettes
                WHERE ............ `, {
                    // replacements: {...: ... },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer les noms de tous les recettes
     *
     * @return {list<string>} Une liste de recettes
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : ??-06-2022)
     * @état : fait
     */
    async getNomRecettes() {
        return this.sequelize
            .query(
                `SELECT nom FROM recette
        `, {
                    // replacements: {...: ... },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer les tags de tous les recettes
     *
     * @return {list<string>} Une liste de tags de recettes
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : ??-06-2022)
     * @état : fait
     */
    async getTagRecettes() {
        return this.sequelize
            .query(
                `SELECT tag FROM recette
        `, {
                    // replacements: {...: ... },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer la recette selon id
     *
     * @param {int} id id de recette
     * @return {Recette} Une recette
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : ??-06-2022)
     * @état : fait
     */
    async getRecettesParId(id) {
        return this.sequelize
            .query(
                `SELECT *
        FROM recette
        WHERE id = :id`, {
                    replacements: { id: id },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer la recette de recommandation
     *
     * @param {int} idUtilisateur id d'utilisateur
     * @return {List<Recette>} Une liste de recettes
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
     * @état : A FAIRE
     */
    async getRecettesParId(id) {
        return this.sequelize
            .query(
                `SELECT *
        FROM utilisateur_recette
        WHERE ...`, {
                    // replacements: { id: id },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de mettre à jour la table de utilisateur_recette
     *
     * @param {int} idUtilisateur id d'utilisateur
     * @param {int} idRecette id de recette
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)
     * @état : A FAIRE
     */
    async getRecettesParId(id) {
        return this.sequelize
            .query(
                `UPDATE utilisateur_recette
                    SET nom_colonne_1 = 'nouvelle valeur'
                    WHERE condition`, {
                    // replacements: { id: id },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }
}

exports.default = Recette;