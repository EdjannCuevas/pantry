/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.dropTable('pantry');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return await knex.schema.createTable('pantry', (table) => {
        table.increments('id').primary(),
        table.string('name', 255).notNullable().unique(),
        table.timestamp('timestamp').notNullable();
    });
};
