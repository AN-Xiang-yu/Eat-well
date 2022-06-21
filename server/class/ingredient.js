class Ingredient {
    constructor(sequelize) {
        this.sequelize = sequelize
    }

    /**
     * Description : Cette fonction permet de récupérer le nom et l'id de tous les ingrédients 
     * 
     * @return {list<Ingredient>} Une liste de recettes
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)

     * @état : A FAIRE
     */
    async getIngredients() {
        return this.sequelize.query(
            `SELECT *
                FROM ingredient
                WHERE ......... `, {
                // replacements: {...: ... },
            }).catch(err => res.status(400).json({ error: err }))
    }

    /**
     * Description : Cette fonction permet de récupérer tous les ids des ingrédients 
     * 
     * @return {list<Ingredient>} Une liste de recettes
     * @author author-name(Prénom NOM) (création : ??-06-2022) (modification : ??-06-2022)

     * @état : A FAIRE
     */
    async getIdIngredients() {
        return this.sequelize.query(
            `SELECT id
                FROM ingredient
                WHERE ......... `, {
                // replacements: {...: ... },
            }).catch(err => res.status(400).json({ error: err }))
    }
}

exports.default = Ingredient;