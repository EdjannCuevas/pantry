/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.createTable('grocery_list', (table) => {
        table.increments('id').primary(),
        table.string('name', 255).notNullable(),
        table.integer('calories').notNullable(),
        table.specificType('ingredients_array', 'text[]').notNullable(),
        table.string('recipe_source', 3000),
        table.string('image_source',3000);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return await knex.schema.dropTable('grocery_list');
};