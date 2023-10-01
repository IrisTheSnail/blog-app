const Pool = require('pg').Pool

import db_init_data from '../.env.ts';

export const pool = new Pool(db_init_data);
