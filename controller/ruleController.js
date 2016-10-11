import db from '../db';
import Promise from 'bluebird';
import _ from 'lodash';
import {Rule} from '../bookshelf';

let ruleName;
let condition;
let ruleData;
let ruleID;
let singleCondition;
let nestedCondition;

module.exports = {

    show: function (req, res) {
        new Rule().fetchAll({ withRelated: ['single_condition', 'nested_condition'] }).then(function (results) {
            res.json(results);
        }).catch(function (err) {
            res.json({ success: false, message: 'error' });
        });
    },

    update: function (req, res) {
        ruleName = req.body.ruleName;
        condition = req.body.condition;
        ruleData = { ruleName, condition };
        singleCondition = _.map(req.body.singleCondition);
        nestedCondition = _.map(req.body.nestedCondition);

        db.transaction(function (trx) {
            return trx('rule').where('id', '=', req.params.id).update(ruleData)
                .then(function (result) {
                    return trx('single_condition').where('rule_id', '=', req.params.id).del()
                })
                .then(function (result) {
                    _.each(nestedCondition, (e) => { e.rule_id = req.params.id });
                    return trx('nested_condition').where('rule_id', '=', req.params.id).del()
                })
                .then(function (result) {
                    if (singleCondition.length != 0) {
                        _.each(singleCondition, (e) => { e.rule_id = req.params.id });
                    }
                    if (nestedCondition.length != 0) {
                        _.each(nestedCondition, (e) => { e.rule_id = req.params.id });
                    }

                    return trx.insert(singleCondition, "id").into("single_condition")

                })
                .then(function (result) {
                    return trx.insert(nestedCondition, "id").into("nested_condition")
                })
        })
            .then(function (rows) {
                new Rule().where('id', req.params.id).fetchAll({ withRelated: ['single_condition', 'nested_condition'] }).then(function (results) {
                    res.json(results);
                })
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            })
    },

    create: function (req, res) {
        ruleName = req.body.ruleName;
        condition = req.body.condition;

        singleCondition = _.map(req.body.singleCondition);
        nestedCondition = _.map(req.body.nestedCondition);
        if (singleCondition.length != 0) {
            ruleData = { ruleName, condition };
        }
        if (nestedCondition.length != 0) {
            ruleData = { ruleName, condition };
        }
        db.transaction(function (trx) {

            return trx
                .insert(ruleData, "id").into("rule")
                .then(function (idArr) {
                    ruleID = idArr[0];
                    console.log(ruleID);
                    if (singleCondition.length != 0) {
                        _.each(singleCondition, (e) => { e.rule_id = ruleID });
                    }
                    if (nestedCondition.length != 0) {
                        _.each(nestedCondition, (e) => { e.rule_id = ruleID });
                    }
                    return trx.insert(singleCondition).into("single_condition");
                }).then(function (result) {
                    return trx.insert(nestedCondition).into("nested_condition");
                });
        })
            .then(function (rows) {
                new Rule().where('id', ruleID).fetchAll({ withRelated: ['single_condition', 'nested_condition'] }).then(function (results) {
                    res.json(results);
                })

            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            })
    },

    destroy: function (req, res) {
        db('rule').where('id', '=', req.params.id).del()
            .then(function (count) {
                return db('rule');
            })
            .then(function (rows) {
                res.json(rows);
            })
            .catch(function (err) {
                res.json({ success: false, message: 'error' });
            });
    }
};
