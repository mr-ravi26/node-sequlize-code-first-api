'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.belongsToMany(models.Plan, {
        through: models.Subscription,
        as: "plans",
        foreignKey: "plan_id",
      });

      User.hasMany(models.Subscription, { as: 'subscriptions', foreignKey: 'user_id' });
    }
  };

  User.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};