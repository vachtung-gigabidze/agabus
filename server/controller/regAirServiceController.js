const fs = require('fs');
const path = require('path');
var rawdata = fs.readFileSync(path.join(__dirname, '../query/queries.json'));
var queries = JSON.parse(rawdata);
const tables = JSON.parse(fs.readFileSync(path.join(__dirname, '../query/tables.json')));

const {
    poolPromise,
    sql
} = require('../database/dboperation.js');


class RegAirServiceController {

    async getAllRegAirService(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(tables.regAirService.queries.select);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async addRegAirService(req, res) {
        const validityData = (newRegAirService => {            
            const error = [];
            if (!newRegAirService.hasOwnProperty("RegNumber")) { error.push('Error RegNumber is null');}
            if (!newRegAirService.hasOwnProperty("DateCreate")) { error.push('Error DateCreate is null');}           
            return error;
        });

        const getValue = (property, defaultValue) => req.body.hasOwnProperty(property)?req.body[property]:defaultValue;
        //const getValueDate = (property) => req.body.hasOwnProperty(property)?req.body[property]:'null';

        const pool = await poolPromise;
        const ps = new sql.PreparedStatement(pool);
        const getType = (type) => { 
            switch (type){
                case type.test("/datetime/"): return sql.SmallDateTime;
                case type.test("/int/"): return sql.Int;
                case type.test("/bit/"): return sql.Bit;
                case type.test("/nchar\([0-9]+\)/"): return sql.NChar(type.exec("/nchar\((?<size>[0-9]+)\)/").size);
                default: return sql.NChar(10);
            }
        }
        tables.regAirService.fields.forEach(field => {
            if (!field.primaryKey){
                ps.input(field.name, getType(field.type)); //, getValue(field.name, field.default)
            }
        });
        

        try {
            const valid = validityData(req.body);
            console.log('ADD', valid);
            if (valid.length === 0) {
                console.log('DateCreate ', req.body.DateCreate);
                const pool = await poolPromise;
                const result = await pool.request()
                    .input("RegNumber", sql.NChar(100), getValueStr("RegNumber"))
                    .input("DateCreate", sql.SmallDateTime, getValueDate("DateCreate"))
                    
                    .query(tables.regAirService.queries.insert);
                console.log('ADD ', result.recordset);
                res.json(result.recordset);

            } else {
                res.status(501);
                res.send(`req : ${JSON.parse(req.body)}`);
            }
        } catch (error) {
            res.status(500);
            res.send(`Error add: ${error.message}`);
        }
    }

    async regAirService(req, res) {
        res.sendFile(path.resolve(__dirname, '../../client/RegAir', 'index.html'));
    }
}

const regAirServiceController = new RegAirServiceController();
module.exports = regAirServiceController;