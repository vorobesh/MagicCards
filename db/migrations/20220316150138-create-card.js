module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      card_name: {
        type: Sequelize.STRING,
      },
      card_price: {
        type: Sequelize.INTEGER,
      },
      card_url: {
        type: Sequelize.STRING,
      },
      id_condition: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Conditions',
          },
          key: 'id',
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Cards');
  },
};
