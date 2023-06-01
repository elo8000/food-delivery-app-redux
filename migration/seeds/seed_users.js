const makeASeedArray = require("../utls/seed/makeASeedArray");
const fixSeq = require("../utls/seed/fixSeq");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert(
    makeASeedArray(
      {
        name: faker.person.fullName,
        email: faker.internet.email,
        phone: faker.phone.number,
        address: () => faker.location.streetAddress({ fullName: true }),
      },
      50
    )
  );
  await fixSeq(knex, "users");
};
