"use strict"

import cfg from './knexfile';
import knex from 'knex';

module.exports = knex(cfg.development);