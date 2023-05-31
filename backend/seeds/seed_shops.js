const makeASeedArray = require("../utls/seed/makeASeedArray");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shops").del();
  await knex("shops").insert(
    makeASeedArray(
      {
        name: faker.company.buzzNoun,
        address: () => faker.location.streetAddress({ fullName: true }),
      },
      50
    )
  );
};
