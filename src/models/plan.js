'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Plan.belongsToMany(models.User, {
        through: models.Subscription,
        as: "users",
        foreignKey: "user_id",
      });

      Plan.hasMany(models.Subscription, { foreignKey: 'plan_id' });
    }
  };

  Plan.init({
    code: DataTypes.STRING,
    validity: DataTypes.STRING,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};