const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Card.init({
    card_name: DataTypes.STRING,
    card_price: DataTypes.INTEGER,
    card_url: DataTypes.INTEGER,
    id_condition: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Conditions',
        },
        key: 'id',
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
