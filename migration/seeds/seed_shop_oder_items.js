const makeASeedArray = require("../utls/seed/makeASeedArray");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("order_items").del();
  await knex("order_items").insert(
    makeASeedArray(
      {
        order_id: () => faker.number.int(100),
        shop_item_id: () => faker.number.int(500),
        count: () => faker.number.int(20),
      },
      1000
    )
  );
};
