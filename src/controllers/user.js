const { User } = require('../models');

module.exports = {
    update(req, res) {
        return User
            .update({
                name: req.body.name,
            }, {
                where: {
                    id: req.params.id
                }
            })
            /// because by default result will be number of rows affected.
            /// So chaining a promise to send updated User record
            .then(() => { return User.findByPk(req.params.id) })
            .then(updatedRecords => res.status(200).send(updatedRecords))
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return User
            .create({
                name: req.body.name,
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return User
            .findByPk(req.params.id)
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    }
};