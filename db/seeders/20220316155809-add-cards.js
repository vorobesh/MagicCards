const fs = require('fs').promises;

module.exports = {
  async up(queryInterface) {
    let dataArray = await fs.readFile('./data/cards.txt', 'utf8');
    dataArray = dataArray.split('\n').slice(1, -1)
      .map((x) => x.split(','))
      .map((x) => ({
        card_name: x[0],
        card_price: x[1],
        card_url: x[2],
        id_condition: x[3],
        id_user: x[4],
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    console.log(dataArray);
    await queryInterface.bulkInsert('Cards', dataArray, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Cards', null, {});
  },
};
