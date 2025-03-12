const fs = require('fs');
const path = require('path');

var queries = require('../query/golden_eye_query.js');
const {
    poolPromise,
    sql
} = require('../database/orion_skd/db_operation.js');
const { log } = require('console');

// const findPerson = (req, res) => {
//     const  = .findPerson(2486);
//     res.send({ status: 'OK', data: });
// };
async function findPerson(req, res) {
        id = req.params['id']
        log(id)
        try {
        if (id != null) {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query(queries.findPerson);

            res.json(result.recordset);
        } else {
            res.send('Please fill all the details!')
        }
        } catch (error) {
            res.status(500);
            res.send(`Error: ${error.message}`);
        }
}

module.exports = { findPerson };