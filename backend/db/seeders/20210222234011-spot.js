'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Spots", [
      {
        head: "Vail Ski Resort",
        body: "Vail Ski Resort is a ski resort located near\
        the town of Vail in Eagle County, Colorado. At 5,289 acres,\
        it is the third-largest single-mountain ski resort in the United States,\
        behind Big Sky and Park City, featuring seven bowls and intermediate\
        gladed terrain in Blue Sky Basin.",
        units: 345,
        tracker: [39.6061, -106.3550],
        urlLink: "https://www.google.com/maps/uv?pb=!1s0x876a7060c630dbdb:0xa7c2cf2d4b45ada2!3m1!7e115!4shttps://lh5.googleusercontent.com/p/AF1QipPMQcDCYWcpeMcWHZVE3LGa5ftU__iffkpLLMRq%3Dw284-h160-k-no!5svail+ski+resort+4+digit+address+-+Google+Search!15zQ2dJZ0FRPT0&imagekey=!1e10!2sAF1QipPMQcDCYWcpeMcWHZVE3LGa5ftU__iffkpLLMRq&hl=en&sa=X&ved=2ahUKEwiLqsf74f7uAhUUJzQIHYBPCGcQoiowD3oECCEQAw",
        firstAddress: "",
        secondAddress: "",
        city: 'Vail',
        state: 'CO',
        country: "USA",
        zip: 81657,
        dailyCost: 400.00,
        type: 0,
        altSite: 'https://www.vail.com/'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
