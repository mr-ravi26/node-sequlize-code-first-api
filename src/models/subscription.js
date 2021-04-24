'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Subscription.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
      Subscription.belongsTo(models.Plan, { foreignKey: 'plan_id', targetKey: 'id', as: 'plan' });
    }

  };

  Subscription.init({
    plan_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    start_date: {

      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('start_date')).format("YYYY-MM-DD");
      }
    },
    days_left: {

      type: DataTypes.VIRTUAL,

      get() {
        let plan = this.getDataValue('plan') && this.getDataValue('plan').dataValues
        if (!plan) return null;

        let planValidity = plan.validity;
        if (planValidity === '-1') return "INFINITE"

        let startedDate = this.getDataValue('start_date')

        if (!startedDate) return "INFINITE"

        startedDate = new Date(startedDate)

        let validity = moment(startedDate).add(planValidity, 'days')

        let days_left = validity.diff(new Date(), 'days') + 1

        return days_left >= 0 ? days_left : 0
      }

    },
    valid_till: {

      type: DataTypes.VIRTUAL,

      get() {
        let plan = this.getDataValue('plan') && this.getDataValue('plan').dataValues
        if (!plan) return null;

        let planValidity = plan.validity;
        if (planValidity === 'INFINITE') return "INFINITE"

        let startedDate = this.getDataValue('start_date')

        if (!startedDate) return "INFINITE"
        return moment(startedDate).add(planValidity, 'days').format("YYYY-MM-DD");
      }

    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });

  return Subscription;
};