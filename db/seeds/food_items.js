/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pantry').del()
  await knex('pantry').insert([
    {name: 'Bananas', date: '2022-11-04'},
    {name: 'Eggs', date: '2022-11-10'},
    {name: 'Milk', date: '2022-11-06'}
  ]);
};
