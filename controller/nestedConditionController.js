import db from '../db';
import screen from '../screen';
import Treeize from 'treeize';

module.exports = {

    show: function (req, res) {
        const query = db("nested_condition")
            .join("rule", "rule.id", "=", "nested_condition.rule_id")
            .select
            (
            "rule.ruleName", "rule.condition","rule.id",
            "nested_condition.fetch_function as nested:fetch_function",
            "nested_condition.operand as nested:operand",
            "nested_condition.operand_function as nested:operand_function",
            "nested_condition.constant as nested:constant",
        ).debug(false)
            .then(function (rows) {
                let tree = new Treeize();
                tree.grow(rows);
                var authors = tree.getData();
                screen.write(authors[0],"json");
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    },
    update: function (req, res) {
        db('nested_condition').where('id', '=', req.params.id).update(req.body)
            .then(function (id) {
                return db('nested_condition');
            })
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    },
    create: function (req, res) {
        db('nested_condition').insert(req.body)
            .then(function (id) {
                return db('nested_condition');
            })
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    },
    destroy: function (req, res) {
        db('nested_condition').where('id', '=', req.params.id).del()
            .then(function (count) {
                return db('nested_condition');
            })
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    }
}