
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('single_condition', function (table) {
            table.increments();
            table.string('operand', 30).notNullable().defaultTo('n/a');
            table.string('operand_function', 30).notNullable().defaultTo('n/a');
            table.string('constant', 30).notNullable().defaultTo('n/a');
            table.integer('rule_id').notNullable().references('id').inTable('rule').onDelete('CASCADE');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('singleCondition');
};
