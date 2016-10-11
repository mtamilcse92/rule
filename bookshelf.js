import db from './db';
import bookShelf from 'bookshelf'
let bookshelf = bookShelf(db);

export var Rule = bookshelf.Model.extend({
    tableName: 'rule',
    single_condition: function () {
        return this.hasMany(Single);
    },
    nested_condition: function () {
        return this.hasMany(Nested);
    }
});

export var Single = bookshelf.Model.extend({
    tableName: 'single_condition',
    rule: function () {
        return this.belongsTo(Rule);
    }
});

export var Nested = bookshelf.Model.extend({
    tableName: 'nested_condition',
    rule: function () {
        return this.belongsTo(Rule);
    }
});