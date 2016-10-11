import db from '../db';
import {Rule} from '../bookshelf';
module.exports = {

    show: function (req, res) {
        new Rule().fetchAll({ withRelated: ['single_condition', 'nested_condition'] }).then(function (results) {
            res.json(results);
        }).catch(function (err) {
            res.json({ success: false, message: 'error' });
        });
    },
    update: function (req, res) {
        db('single_condition').where('id', '=', req.params.id).update(req.body)
            .then(function (id) {
                return db('single_condition');
            })
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    },
    create: function (req, res) {
        db('single_condition').insert(req.body)
            .then(function (id) {
                return db('single_condition');
            })
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    },
    destroy: function (req, res) {
        db('single_condition').where('id', '=', req.params.id).del()
            .then(function (id) {
                return db('single_condition');
            })
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    }
}