const fs = require('fs').promises;

module.exports = {
  async up(queryInterface) {
    let dataArray = await fs.readFile('./data/users.txt', 'utf8');
    dataArray = dataArray.split('\n').slice(1, -1)
      .map((x) => x.split(','))
      .map((x) => ({
        user_name: x[0],
        user_email: x[1],
        user_password: x[2],
        id_city: x[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    console.log(dataArray);
    await queryInterface.bulkInsert('Users', dataArray, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
