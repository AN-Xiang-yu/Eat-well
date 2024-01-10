class Utilisateur {
    constructor(sequelize) {
        this.sequelize = sequelize
    }

    /**
     * Description : Cette fonction permet de vérifier l'existence de l'utilisateur
     * On va utiliser les deux entrées pour récupérer son existence
     *
     * @param {string} email email de l'utilisateur
     * @param {string} surnom surnom de l'utilisateur
     * @return {Utilisateur} tous les informations principales d'utilisateur
     * @author author-name(Xiangyu AN) (création : 18-06-2022) (modification : 18-06-2022)
     * @état : Fini
     */
    async exister(email, surnom) {
        return this.sequelize.query(
            `SELECT DISTINCT * 
                FROM utilisateur 
                WHERE email = :email or surnom = :surnom`, {
                replacements: { email: email, surnom: surnom },
            }).catch(err => res.status(400).json({ error: err }))
    }

    /**
     * Description : Cette fonction permet d'ajouter l'utilisateur dans la table d'utilisateur
     * On va utiliser les trois entrées pour alimenter la table d'utilisateur
     *
     * @param {string} email email de l'utilisateur
     * @param {string} surnom surnom de l'utilisateur
     * @param {string} mdphash mot de passe haché de l'utilisateur
     * @return {int} id d'utilisateur ajouté
     * @author author-name(Xiangyu AN) (création : 18-06-2022) (modification : 18-06-2022)
     * @état : Fini
     */
    async ajouterUtilisateur(email, surnom, mdphash) {
        return this.sequelize.query(
            `INSERT INTO utilisateur(email, surnom, mdp) 
                VALUES(:email, :surnom, :mdp)`, {
                replacements: { email: email, surnom: surnom, mdp: mdphash },
            }).catch(err => res.status(400).json({ error: err }))
    }

    /**
     * Description : Cette fonction permet de récupérer l'utilisateur par son email ou surnom
     * On va utiliser les trois entrées pour alimenter la table d'utilisateur
     *
     * @param {string} emailSurnom email ou surnom de l'utilisateur
     * @return {Utilisateur} les informations de l'utilisateur
     * @author author-name(Xiangyu AN) (création : 19-06-2022) (modification : 19-06-2022)
     * @état : Fini
     */
    async getUtilisateur(emailSurnom) {
        return this.sequelize.query(
            `SELECT id AS idUtilisateur, surnom, email, mdp
                FROM utilisateur 
                WHERE email = :email_surnom or surnom = :email_surnom`, {
                replacements: { email_surnom: emailSurnom },
            }
        ).catch(err => res.status(400).json({ error: err }))
    }

    /**
     * Description : Cette fonction permet de récupérer l'utilisateur par id
     * On va utiliser les trois entrées pour alimenter la table d'utilisateur
     *
     * @param {int} idUtilisateur email ou surnom de l'utilisateur
     * @return {Utilisateur} les informations de l'utilisateur
     * @author author-name(Xiangyu AN) (création : 18-06-2022) (modification : 18-06-2022)
     * @état : Fini
     */
    async getUtilisateurParId(idUtilisateur) {
        return this.sequelize.query(
            `SELECT id as idUtilisateur, surnom, email, mdp
                FROM utilisateur
                WHERE id = :idUtilisateur `, {
                replacements: { idUtilisateur: idUtilisateur },
            }).catch(err => res.status(400).json({ error: err }))
    }
}

exports.default = Utilisateur;