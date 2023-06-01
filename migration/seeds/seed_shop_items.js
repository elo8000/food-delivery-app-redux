const makeASeedArray = require("../utls/seed/makeASeedArray");
const fixSeq = require("../utls/seed/fixSeq");
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
        shop_id: () => faker.number.int({ min: 1, max: 50 }),
        price: () => faker.number.int({ min: 1, max: 50 }),
        imageUrl: () => "http://via.placeholder.com/400x200",
      },
      500
    )
  );
  await fixSeq(knex, "shop_items");
};
