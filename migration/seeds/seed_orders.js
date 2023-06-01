const makeASeedArray = require("../utls/seed/makeASeedArray");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("orders").del();
  await knex("orders").insert(
    makeASeedArray(
      {
        user_id: () => faker.number.int({ min: 1, max: 50 }),
        timestamp: faker.date.recent,
      },
      100
    )
  );
};
