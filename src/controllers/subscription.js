const { Subscription, User, Plan, sequelize } = require('../models');
const moment = require('moment');
const { Op } = require("sequelize");

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
        let checkForDate = moment(req.params.start_date).format("YYYY-MM-DD HH:MM:SS");
        console.log("checkForDate", checkForDate);

        const dateQuery = `DATE_PART('day', '${checkForDate}' - "subscriptions"."start_date")`

        return User
            .findAll({
                where: {
                    id: req.params.user_id,
                },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Subscription,
                        as: 'subscriptions',
                        attributes: [
                            'start_date', 'days_left', 'valid_till'
                        ],
                        include: [
                            {
                                model: Plan,
                                as: 'plan',
                                attributes: ['code', 'validity', 'cost'],
                                where: {
                                    [Op.or]: [
                                        sequelize.where(
                                            sequelize.cast(sequelize.col('validity'), 'integer'),
                                            {
                                                [Op.or]: [
                                                    {
                                                        [Op.gte]: sequelize.literal(dateQuery)
                                                    },
                                                    { [Op.eq]: -1 }
                                                ]
                                            }
                                        )
                                    ],
                                }
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
    }
};