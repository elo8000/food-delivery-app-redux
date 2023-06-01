const makeASeedArray = require("../utls/seed/makeASeedArray");
const fixSeq = require("../utls/seed/fixSeq");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");
const KHARKIV_GEOLOCATION = {
  lat: 49.98081,
  lng: 36.25272,
};
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shops").del();
  await knex("shops").insert(
    makeASeedArray(
      {
        name: faker.company.buzzNoun,
        address: () => faker.location.streetAddress({ fullName: true }),
        lat: () =>
          faker.location.latitude({
            min: KHARKIV_GEOLOCATION.lat - 2,
            max: KHARKIV_GEOLOCATION.lat + 2,
          }),
        lng: () =>
          faker.location.latitude({
            min: KHARKIV_GEOLOCATION.lng - 2,
            max: KHARKIV_GEOLOCATION.lng + 2,
          }),
      },
      50
    )
  );
  await fixSeq(knex, "orders");
};
