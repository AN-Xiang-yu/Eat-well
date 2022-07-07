class Ingredient {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    /**
       * Description : Cette fonction permet de récupérer le nom et l'id de tous les ingrédients 
       * 
       * @return {list<Ingredient>} Une liste de recettes
       * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : ??-06-2022)

       * @état : fini
       */
    async getIngredients() {
        return this.sequelize
            .query(`SELECT nom, id FROM ingredient `, {
                // replacements: {...: ... },
            })
            .catch((err) => res.status(400).json({ error: err }));
    }

    /**
       * Description : Cette fonction permet de récupérer tous les id des ingrédients 
       * 
       * @return {list<Ingredient>} Une liste d'ids d'ingrédients
       * @author author-name(Essaid Benamar) (création : 21-06-2022) (modification : ??-06-2022)

       * @état : fini
       */
    async getIdIngredients() {
        return this.sequelize
            .query(`SELECT id FROM ingredient `, {
                // replacements: {...: ... },
            })
            .catch((err) => res.status(400).json({ error: err }));
    }
}

exports.default = Ingredient;