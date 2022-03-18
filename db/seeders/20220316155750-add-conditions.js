const fs = require('fs').promises;

module.exports = {
  async up(queryInterface) {
    let dataArray = await fs.readFile('./data/conditions.txt', 'utf8');
    dataArray = dataArray.split('\n').slice(1, -1)
      .map((x) => ({
        condition_name: x,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    await queryInterface.bulkInsert('Conditions', dataArray, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Conditions', null, {});
  },
};
