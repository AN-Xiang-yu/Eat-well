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
     * @état : Fini
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

    /**
     * Description : Cette fonction permet de récupérer les recettes selon les noms des ingrédients et des recettes
     *
     * @param {List<String>} motsCles une liste des noms des ingrédients et des recettes
     * @param {list<string>} motsClesANePasPrendre une liste de mots clés à ne pas prendre
     * @param {List<object>} contraintes une liste de contraintes 
     * @author author-name(Xiangyu AN) (création : 07-07-2022) (modification : 07-07-2022)
     * @return {Recette} Une liste de recettes
     * @état : Fini
     */
    async getRecettesParMotsCles(motsCles, motsClesANePasPrendre, contraintes) {
        let sqlConstraintes = ''
        let aPrendre = null
        let aNePasPrendre = null

        //les mots clés à prendre
        aPrendre = '("'
        for (let index = 0; index < motsCles.length - 1; index++) {
            aPrendre += motsCles[index] + '", "'
        }
        aPrendre += motsCles[motsCles.length - 1] + '")'

        //les mots clés à ne pas prendre
        aNePasPrendre = '("'
        for (let index = 0; index < motsClesANePasPrendre.length - 1; index++) {
            aNePasPrendre += motsClesANePasPrendre[index] + '", "'
        }
        aNePasPrendre += motsClesANePasPrendre[motsClesANePasPrendre.length - 1] + '")'

        //les contraintes
        if (contraintes.sansProc != false) sqlConstraintes += ' AND sans_porc = ' + contraintes.sansProc
        if (contraintes.vegane != false) sqlConstraintes += ' AND vegane = ' + contraintes.vegane
        if (contraintes.vegetarien != false) sqlConstraintes += ' AND vegetarien = ' + contraintes.vegetarien
        if (contraintes.sansAlcool != false) sqlConstraintes += ' AND sans_alcool = ' + contraintes.sansAlcool
        if (contraintes.sansGluten != false) sqlConstraintes += ' AND sans_gluten = ' + contraintes.sansGluten

        return this.sequelize
            .query(
                `
                SELECT r.id as id_recette, r.nom as nomRecette, ingredients, etapes, image
                FROM recette r 
                WHERE r.nom IN ${aPrendre} AND r.nom NOT IN 
                    (
                        SELECT r.nom
                        FROM recette r 
                        WHERE r.nom IN ${aNePasPrendre} 
                    )
                UNION(
                    SELECT r.id as id_recette, r.nom as nomRecette, ingredients, etapes, image
                    FROM ingredient i 
                    INNER JOIN ingredient_recette ir ON i.id = ir.id_ingredient
                    INNER JOIN recette r ON r.id = ir.id_recette
                    WHERE i.nom IN ${aPrendre} AND i.nom NOT IN
                        (
                            SELECT i.nom
                            FROM ingredient i 
                            INNER JOIN ingredient_recette ir ON i.id = ir.id_ingredient
                            INNER JOIN recette r ON r.id = ir.id_recette
                            WHERE i.nom IN ${aNePasPrendre}
                        ) ${sqlConstraintes}
                )`,
            ).catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer les noms de tous les recettes
     *
     * @return {list<string>} Une liste de recettes
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : 07-07-2022)
     * @état : Fini
     */
    async getNomsRecettes() {
        return this.sequelize
            .query(
                `SELECT id as idRecette, nom as nomRecette FROM recette`
            )
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer les Ids de tous les recettes
     *
     * @return {list<string>} Une liste de recettes
     * @author author-name(Xiangyu AN) (création : 06-07-2022) (modification : 06-07-2022)
     * @état : Fini
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
     * @état : Fini
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
     * @état : Fini
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
     * @état : Fini
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
     * @état : Fini
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
     * @état : Fini
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