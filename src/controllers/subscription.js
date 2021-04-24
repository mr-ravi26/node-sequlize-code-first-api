const { Subscription, User, Plan } = require('../models');

module.exports = {
    create(req, res) {
        return Subscription
            .create({
                plan_id: req.body.plan_id,
                user_id: req.body.user_id,
                start_date: new Date(req.body.start_date),
            })
            .then(subscription => res.status(200).send(subscription))
            .catch(error => res.status(400).send(error));
    },
    getUserSubscriptions(req, res) {
        return User
            .findAll({
                where: {
                    id: req.params.user_id
                },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Subscription,
                        as: 'subscriptions',
                        attributes: ['start_date', 'days_left', 'valid_till'],
                        include: [
                            {
                                model: Plan,
                                as: 'plan',
                                attributes: ['code', 'validity', 'cost'],
                            }
                        ]
                    }
                ]
            })
            .then(users => res.status(200).send(users))
            .catch(error => {
                console.error("User subscription load error", error)
                res.status(400).send(error)
            });
    },
    getSubscription(req, res) {
        return User
            .findByPk(req.params.id)
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    }
};