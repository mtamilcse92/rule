import express from 'express';
import ruleController from '../controller/ruleController';
import singleController from '../controller/singleConditionController';
import nestedController from '../controller/nestedConditionController';
const router = express.Router();

router.route('/rules').get(ruleController.show);
router.route('/rules').post(ruleController.create);
router.route('/rules/:id').put(ruleController.update);
router.route('/rules/:id').delete(ruleController.destroy);

router.route('/single').get(singleController.show); 
router.route('/single').post(singleController.create);
router.route('/single/:id').put(singleController.update);
router.route('/single/:id').delete(singleController.destroy);

router.route('/nested').get(nestedController.show);
router.route('/nested').post(nestedController.create);
router.route('/nested/:id').put(nestedController.update);
router.route('/nested/:id').delete(nestedController.destroy);

module.exports = router;