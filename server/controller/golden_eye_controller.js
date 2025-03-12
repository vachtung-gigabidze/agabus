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
        var name = req.params['name']
        log(name)
        try {
        if (name != null) {
            const pool = await poolPromise;
            const result = await pool.request()
                // .input("id", sql.Int, id)
                .input("name", sql.NVarChar, '%'+name+'%')
                .query(queries.findPerson);
            
            var owner = result.recordset[0].Owner
            log(owner)
            const resultRemark = await pool.request()
            // .input("id", sql.Int, id)
            .input("id", sql.Int, owner)
            .query(queries.findLastRemark);    
            
            remark = resultRemark.recordset[0] 
            
            const resultPersonInfo = await pool.request()
            // .input("id", sql.Int, id)
            .input("id", sql.Int, owner)
            .query(queries.findPersonInfo);    

            personInfo = resultPersonInfo.recordset[0]

            ownerName = result.recordset[0].OwnerName
            //res.json({'name': ownerName , remark, personInfo});
             res.json({'name': ownerName , 'time':remark.TimeVal, 'device':remark.Remark, 'org': personInfo.Org, 'title': personInfo.Title  });
        } else {
            res.send('Please fill all the details!')
        }
        } catch (error) {
            res.status(500);
            res.send(`Error: ${error.message}`);
        }
}

async function findLastRemark(id){
    log(id)
    try {
    if (id != null) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(queries.findLastRemark);

        return await result.recordset[0];
    } else {
        log('Please fill all the details!')
        return
    }
    } catch (error) {            
        log(`Error: ${error.message}`);
    }
}

module.exports = { findPerson };