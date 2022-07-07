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
     * @état : fini
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
     * @état : fini
     */
    async getNomRecettes() {
        return this.sequelize
            .query(
                `SELECT nom FROM recette`
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer les Ids de tous les recettes
     *
     * @return {list<string>} Une liste de recettes
     * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
     * @état : fini
     */
    async getIdRecettes() {
        return this.sequelize
            .query(
                `SELECT id FROM recette`
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer la recette selon id
     *
     * @param {int} idRecette id de recette
     * @return {Recette} Une recette
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : 06-07-2022)
     * @état : Non fini
     */
    async getRecetteParId(idRecette) {
        return this.sequelize
            .query(
                `SELECT r.nom, ingredients, etapes, image, t.nom as type
                    FROM recette r
                        INNER JOIN type t ON t.id = r.id_type
                    WHERE r.id = :idRecette`, {
                    replacements: { idRecette: parseInt(idRecette) },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer les recettes de recommandation
     *
     * @param {int} idUtilisateur id d'utilisateur
     * @return {List<Recette>} Une liste de recettes
     * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
     * @état : fini
     */
    async getRecettesRecommandationParIdUtilisateur(idUtilisateur) {
        return this.sequelize
            .query(
                `SELECT id_utilisateur, ur.id_recette, r.nom as nomRecette, ingredients, etapes, t.nom as type, iteration, image
                    FROM utilisateur_recette ur 
                        INNER JOIN recette r ON ur.id_recette = r.id
                        INNER JOIN type t ON t.id = r.id_type
                    WHERE id_utilisateur = :idUtilisateur 
                        AND iteration = 
                            (SELECT MAX(iteration) FROM utilisateur_recette WHERE id_utilisateur = :idUtilisateur)`, {
                    replacements: { idUtilisateur: idUtilisateur },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de mettre à jour la table de utilisateur_recette
     *
     * @param {int} idUtilisateur id d'utilisateur
     * @param {int} idRecette id de recette
     * @param {int} iteration numéro d'iteration de recommandation de recette
     * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
     * @état : fini
     */
    async mettreAJourRecommandation(idUtilisateur, idRecette, iteration) {
        return this.sequelize
            .query(
                `UPDATE utilisateur_recette
                    SET clique = 1
                    WHERE id_utilisateur = :idUtilisateur AND id_recette = :idRecette AND iteration = :iteration`, {
                    replacements: { idUtilisateur: idUtilisateur, idRecette: idRecette, iteration: iteration },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de mettre à jour la table de utilisateur_recette
     *
     * @param {int} idUtilisateur id d'utilisateur
     * @param {int} idRecette id de recette
     * @param {int} iteration numéro d'iteration de recommandation de recette
     * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
     * @état : fini
     */
    async addRecommandation(idUtilisateur, idRecette, iteration) {
        return this.sequelize
            .query(
                `INSERT INTO utilisateur_recette (id_utilisateur, id_recette, clique, iteration)
                    VALUES(:idUtilisateur, :idRecette, 0, :iteration)`, {
                    replacements: { idUtilisateur: idUtilisateur, idRecette: idRecette, iteration: iteration },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer 
     * le plus récent numéro d'itération de recettes de recommation de l'utilisateur donné
     *
     * @param {int} idUtilisateur id d'utilisateur
     * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
     * @état : fini
     */
    async getPlusRecenteIterationRecettesRecommandation(idUtilisateur) {
        return this.sequelize
            .query(
                `SELECT MAX(iteration) as iteration
                    FROM utilisateur_recette 
                    WHERE id_utilisateur = :idUtilisateur`, {
                    replacements: { idUtilisateur: idUtilisateur },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }
}

exports.default = Recette;