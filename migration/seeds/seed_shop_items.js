const makeASeedArray = require("../utls/seed/makeASeedArray");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shop_items").del();
  await knex("shop_items").insert(
    makeASeedArray(
      {
        name: faker.commerce.product,
        shop_id: () => faker.number.int(50),
      },
      500
    )
  );
};
