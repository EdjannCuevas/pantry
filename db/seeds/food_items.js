/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pantry').del()
  await knex('pantry').insert([
    {name: 'Bananas', timestamp: '2022-11-04T11:24:32.510Z'},
    {name: 'Eggs', timestamp: '2022-11-10T12:06:42.012Z'},
    {name: 'Milk', timestamp: '2022-11-06T15:01:52.037Z'}
  ]);
};
