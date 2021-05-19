//const {config} = require('./dbconfig');
const sql = require('mssql');
const {
    config
} = require('./dbconfig');


const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql,
    poolPromise       
};




/*
SELECT [id]
      ,[Action]
      ,[Controller]
      ,[Name]
      --,[Content]
      ,[Description]
      ,[Owner]
      ,[IsActive]
      --,[DataArea]
      ,[OrderKey]
      ,[Context]
      ,[RecVersion]
      ,[ChangeDate]
  FROM [WebInstance2014].[dbo].[MVC_ActionContent]
*/

// async function getActionContent() {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(config);
//         const result = await sql.query `select [id]
//                                             ,[Action]
//                                             ,[Controller]
//                                             ,[Name]
//                                             ,[Description]
//                                             ,[Owner]
//                                             ,[IsActive]      
//                                             ,[OrderKey]
//                                             ,[Context]
//                                             ,[RecVersion]
//                                             ,[ChangeDate]
//                                             from MVC_ActionContent`;
//         //console.log('DB SELECT', result.recordset);
//         return result.recordset;
//     } catch (err) {
//         console.dir(err);
//         // ... error checks
//     }
// }

// async function getActionContentById(actionContentId) {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(config);
//         const result = await sql.query `select [id]
//                                             ,[Action]
//                                             ,[Controller]
//                                             ,[Name]
//                                             ,[Description]
//                                             ,[Owner]
//                                             ,[IsActive]      
//                                             ,[OrderKey]
//                                             ,[Context]
//                                             ,[RecVersion]
//                                             ,[ChangeDate]
//                                             from MVC_ActionContent
//                                             where id = ${actionContentId}`;
//         //console.log('DB SELECT', result.recordset);
//         return result.recordset;
//     } catch (err) {
//         console.dir(err);
//         // ... error checks
//     }
// }