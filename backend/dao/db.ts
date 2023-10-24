const Pool = require('pg').Pool;

import * as env from "../.env.ts";


export const pool = new Pool(env.default.dbConnection);
