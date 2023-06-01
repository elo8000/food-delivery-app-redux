const makeASeedArray = require("../utls/seed/makeASeedArray");
const fixSeq = require("../utls/seed/fixSeq");
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
        order_id: () => faker.number.int({ min: 1, max: 100 }),
        shop_item_id: () => faker.number.int({ min: 1, max: 500 }),
        price: () => faker.number.int({ min: 1, max: 50 }),
        count: () => faker.number.int({ min: 1, max: 20 }),
      },
      1000
    )
  );
  await fixSeq(knex, "orders");
};
