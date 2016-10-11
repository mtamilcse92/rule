
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('rule', function (table) {
            table.increments();
            table.string('ruleName', 30).notNullable().defaultTo('n/a');
            table.string('condition', 30).notNullable().defaultTo('n/a');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('rule');
};
