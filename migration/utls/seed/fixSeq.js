module.exports = function fixSeq(knex, table) {
  return knex.raw(`select setval('${table}_id_seq', max(id)) from ${table}`);
}; // knex insert doest update postgres indexes so we have to do it manually
