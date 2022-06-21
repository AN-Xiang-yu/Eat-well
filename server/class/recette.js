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
            `,
        {
          replacements: { nbrRecette: nbrRecette },
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
                WHERE ............ `,
        {
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
        `,
        {
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
        `,
        {
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
  async getTagRecettes(id) {
    return this.sequelize
      .query(
        `SELECT *
        FROM recette
        WHERE id = :id`,
        {
          replacements: { id: id },
        }
      )
      .catch((err) => res.status(400).json({ error: err }));
  }
}

exports.default = Recette;
