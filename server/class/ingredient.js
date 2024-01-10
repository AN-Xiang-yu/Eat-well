class Ingredient {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    /**
     * Description : Cette fonction permet de récupérer le nom et l'id de tous les ingrédients 
     * 
     * @return {list<Ingredient>} Une liste de recettes
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : 07-07-2022)
     * @état : Fini
     */
    async getNomsIngredients() {
        return this.sequelize
            .query(`SELECT nom as nomIngredient, id as idIngredient FROM ingredient`)
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
     * Description : Cette fonction permet de récupérer tous les id des ingrédients 
     * 
     * @return {list<Ingredient>} Une liste d'ids d'ingrédients
     * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : ??-06-2022)
     * @état : Fini
     */
    async getIdIngredients() {
        return this.sequelize
            .query(`SELECT id FROM ingredient`)
            .catch((err) => res.status(400).json({ error: err }));
    }


    /**
     * Description : Cette fonction permet de récupérer les informations des ingrédients des recettes
     *
     * @param {int} idRecette id de recette
     * @return {list<Ingredient>} Une liste des ingrédients
     * @author author-name(Xiangyu AN) (création : 07-07-2022) (modification : 07-07-2022)
     * @état : Fini
     */
    async getIngredientsParIdRecette(idRecette) {
        return this.sequelize
            .query(
                `SELECT id_ingredient, quantite, energie, lipide, sel, alcool, vitamine_A, production_CO2, 
                    consommation_eau, sans_porc, vegane, vegetarien, sans_alcool, sans_gluten
                    FROM ingredient_recette ir
                        INNER JOIN ingredient i ON i.id = ir.id_ingredient
                    WHERE id_recette = :idRecette`, {
                    replacements: { idRecette: parseInt(idRecette) },
                }
            )
            .catch((err) => res.status(400).json({ error: err }));
    }
}

exports.default = Ingredient;