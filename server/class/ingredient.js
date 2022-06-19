class Ingredient {
    constructor(sequelize) {
        this.sequelize = sequelize
    }

    //récupérer tous les livres du site
    async getLivres(langue) {
        return this.sequelize.query(
            `SELECT DISTINCT l.isbn, title, auteur, editeur, note, nom_langue_livre, date_pub, couverture, cache, 
            quantite AS quantite_total, COALESCE(quantite_emprunte,0) as quantite_emprunte, (quantite-COALESCE(quantite_emprunte,0)) AS quantite_disponible
                FROM livre l 
                INNER JOIN livre_${langue} ll ON l.isbn = ll.isbn
                INNER JOIN langue_livre lanl ON lanl.id_langue_livre = l.id_langue_livre
                INNER JOIN langue_livre_${langue} lanll ON lanl.id_langue_livre = lanll.id_langue_livre
                LEFT JOIN 
                    (SELECT isbn, SUM(quantite_item) AS quantite_emprunte
                        FROM panier_item 
                        GROUP BY isbn) AS t2 ON l.isbn = t2.isbn`
        ).catch(err => res.status(400).json({ error: err }))
    }

}

exports.default = Ingredient;