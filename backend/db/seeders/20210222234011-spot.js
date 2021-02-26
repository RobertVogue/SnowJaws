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
        urlLink: 1,
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
      {
        head: "Beaver Creek Lodge",
        body: "Beaver Creek is a mountain village in Colorado. It’s home to Beaver\
        Creek Resort, with its ski runs, terrain parks and cross-country routes. In summer,\
        flower-dotted Beaver Creek Mountain has a hiking center. The Vilar Performing Arts Center\
        Beaver Creek presents theater, concerts and comedy. The Children's Museum at Beaver Creek\
        offers play-based exhibits, while the Beaver Creek Children’s Theatre has shows nearby.",
        units: 71,
        tracker: [39.6061, -106.3550],
        urlLink: 2,
        firstAddress: "26 Avondale Lane",
        secondAddress: "",
        city: 'Beaver Creek',
        state: 'CO',
        country: "USA",
        zip: 81620,
        dailyCost: 400.00,
        type: 0,
        altSite: 'https://www.beavercreek.com/'
      },
      {
        head: "The Cliff Lodge at SnowBird",
        body: "Snowbird is an unincorporated community in Little Cottonwood Canyon\
        in the Wasatch Range of the Rocky Mountains near Salt Lake City, Utah, United States.\
        It is most famous for Snowbird Ski and Summer Resort, an alpine skiing and snowboarding area,\
        which opened in December 1971.",
        units: 212,
        tracker: [39.6061, -106.3550],
        urlLink: 3,
        firstAddress: "9320 Cliff Lodge Dr",
        secondAddress: "",
        city: 'Snowbird',
        state: 'UT',
        country: "USA",
        zip: 84092,
        dailyCost: 350.00,
        type: 0,
        altSite: 'https://www.snowbird.com/lodging/the-cliff-lodge/'
      },
      {
        head: "Jackson Hole Mountain Resort",
        body: "Jackson Hole Mountain Resort is a ski resort in the western United States,\
        at Teton Village, Wyoming. In the Teton Range of the Rocky Mountains, it is located\
        in Teton County, 12 miles northwest of Jackson and due south of Grand Teton National Park.",
        units: 290,
        tracker: [39.6061, -106.3550],
        urlLink: 4,
        firstAddress: "3395 Cody Ln",
        secondAddress: "",
        city: 'Teton Village',
        state: 'WY',
        country: "USA",
        zip: 83025,
        dailyCost: 250.00,
        type: 0,
        altSite: 'https://www.jacksonhole.com/'
      },
      {
        head: "Heavenly Mountain Resort",
        body: "Heavenly Mountain Resort is a ski resort located on the California–Nevada\
        border in South Lake Tahoe in the Sierra Nevada Mountain Range.\
        It opened for business on December 15, 1955 and has 97 runs and 30 lifts that are spread\
        between California and Nevada and four base facilities.",
        units: 98,
        tracker: [39.6061, -106.3550],
        urlLink: 5,
        firstAddress: "3860 Saddle Rd",
        secondAddress: "",
        city: 'South Lake Tahoe',
        state: 'CA',
        country: "USA",
        zip: 96150,
        dailyCost: 500.00,
        type: 0,
        altSite: 'https://www.skiheavenly.com/'
      },
      {
        head: "Ski Lift Lodge at SnowBowl",
        body: "Set across a cluster of cabins surrounded by pine trees,\
        this rural resort off Route 180 is 7 miles from the Arizona Snowbowl\
        ski resort and 66 miles from the Grand Canyon National Park.",
        units: 42,
        tracker: [39.6061, -106.3550],
        urlLink: 6,
        firstAddress: "6355 US-180",
        secondAddress: "",
        city: 'Flagstaff',
        state: 'AZ',
        country: "USA",
        zip: 86001,
        dailyCost: 100.00,
        type: 0,
        altSite: 'https://www.snowbowl.ski/'
      },
      {
        head: "Mammoth Mountain Main Lodge",
        body: "Mammoth Mountain Ski Area is a large ski resort in the western United States,\
        located in eastern California along the east side of the Sierra Nevada mountain range\
        in the Inyo National Forest. Mammoth has more than 3,500 acres of ski-able terrain, serviced by 28 lifts.",
        units: 200,
        tracker: [39.6061, -106.3550],
        urlLink: 7,
        firstAddress: "10001 Minaret Rd",
        secondAddress: "",
        city: 'Mammoth Lakes',
        state: 'CA',
        country: "USA",
        zip: 93546,
        dailyCost: 300.00,
        type: 0,
        altSite: 'https://www.mammothmountain.com/'
      },
      {
        head: "Big Bear Mountain Resort",
        body: "During the winter, make your way to Snow Summit (peak 8,200 feet)\
        and Bear Mountain (peak 8,805 feet) to experience the best snow conditions,\
        longest season, and most rideable terrain in Southern California. Winter operations\
        at Big Bear Mountain Resort are typically from November to April and all lift tickets\
        are valid for same-day use at both mountains, which means access to over 400 skiable acres,\
        26 lifts, and more than 55 runs.",
        units: 200,
        tracker: [39.6061, -106.3550],
        urlLink: 8,
        firstAddress: "880 Summit Blvd",
        secondAddress: "",
        city: 'Big Bear Lake',
        state: 'CA',
        country: "USA",
        zip: 92315,
        dailyCost: 200.00,
        type: 0,
        altSite: 'https://www.bigbearmountainresort.com/'
      },
      {
        head: "Whistler Blackcomb",
        body: "Whistler Mountain is a mountain in the Fitzsimmons Range of the Pacific Ranges\
        of the Coast Mountains, located on the northwestern edge of Garibaldi Provincial Park.\
        It is the location of the Whistler-Blackcomb ski resort and the town of Whistler, British Columbia.",
        units: 420,
        tracker: [39.6061, -106.3550],
        urlLink: 9,
        firstAddress: "4545 Blackcomb Way",
        secondAddress: "",
        city: 'Whistler',
        state: 'BC V0N 1B4',
        country: "CA",
        zip: 14,
        dailyCost: 500.00,
        type: 0,
        altSite: 'https://www.whistlerblackcomb.com/'
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
