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

        const createInsert = (add) => {
            let newAdd = add;
            const fields =  Object.keys(req.body).join(',');
                        
            const values =  Object.keys(req.body).map(fieldName => '@'+fieldName).join(',');
                //return Object.values(req.body).map(v => {'@'+ v}).join(',');
        
            newAdd = newAdd.replace(/@FIELDS/gi, fields);
            newAdd = newAdd.replace(/@VALUES/gi, values);
            
            return newAdd;
        };

        const getValue = (property, defaultValue) => req.body.hasOwnProperty(property)?req.body[property]:defaultValue;
        const exist = (property) => req.body.hasOwnProperty(property);
        //const getValueDate = (property) => req.body.hasOwnProperty(property)?req.body[property]:'null';
                
        const getType = (type) => { 
            switch (type){
                case type.match("/datetime/"): return sql.SmallDateTime;
                case type.match("/int/"): return sql.Int;
                case type.match("/bit/"): return sql.Bit;
                case type.match("/nchar\([0-9]+\)/"): return sql.NChar(type.exec("/nchar\((?<size>[0-9]+)\)/").size);
                default: return sql.NChar(10);
            }
        }
        const build = async function f(poolRequest) {
            
            tables.regAirService.fields.forEach(field => {
                if (!field.primaryKey && exist(field.name)){
                    poolRequest.input(field.name, getType(field.type), getValue(field.name, field.default));
                }
            });
            const queryStr = createInsert(tables.regAirService.queries.add);
            poolRequest.query(queryStr);
            //console.log('ADD build ', queryStr);
            return poolRequest;
        } 
        
        try {
            const valid = validityData(req.body);
            //console.log('ADD V', valid);
            if (valid.length === 0) {                
                const pool = await poolPromise;
                const result = await build(pool.request());
                    
                //console.log('ADD Record', result);
                //res.json(result.recordset);

            } else {
                res.status(501);
                res.send(`req : ${JSON.parse(req.body)}`);
            }
        } catch (error) {
            res.status(500);            
            res.send(`Error add: ${error.message}`);
        } 
    }

    async updateRegAirService(req, res){
        const validityData = (newRegAirService => {            
            const error = [];
            if (!newRegAirService.hasOwnProperty("RegNumber")) { error.push('Error RegNumber is null');}
            if (!newRegAirService.hasOwnProperty("DateCreate")) { error.push('Error DateCreate is null');}           
            return error;
        });

        //console.log(req.body);

        const createUpdate = (update) => {
            let newUpdate = update;
                        
            const params =  Object.keys(req.body).filter(fn => fn!='id' && req.body[fn] != null).map(fieldName => `[${fieldName}] = @${fieldName}`).join(',');
        
            newUpdate = newUpdate.replace(/@PARAM/gi, params);
            //console.log('newUpdate ',newUpdate);

            return newUpdate;
        };

        const exist = (property) => req.body.hasOwnProperty(property)?req.body[property]!=null:false;
        
        const getValue = (property, defaultValue) =>  exist(property)?typeof req.body[property] == 'string'?req.body[property].trim():req.body[property]:defaultValue; 

        const getType = (type) => { 
            const reChar = new RegExp(/\d+/);
            
            if (type.match(reChar)!=null){ return sql.NChar(+type.match(reChar)[0]);}               
            if (type.match(/datetime/)){ return sql.SmallDateTime;}
            if (type.match(/int/)){ return sql.Int;}
            if (type.match(/bit/)){ return sql.Bit;}
            
            return sql.NChar(10);            
        }

        const testGetType = () =>
        {
            console.log('RUN TESTS');
            if (getType("int") === sql.Int){
                console.log("good int");
            }
            if (getType("datetime") === sql.SmallDateTime){
                console.log("good datetime");
            }
            if (getType("bit") === sql.Bit){
                console.log("good bit");
            }
            if (getType("nchar(100)") === sql.NChar(100)){
                console.log("good nchar(100)");
            }
        }

        testGetType();

        //const getValueDate = (property) => req.body.hasOwnProperty(property)?req.body[property]:'null';
        
        const build = async function f(poolRequest) {            
            
            const queryStr = createUpdate(tables.regAirService.queries.edit);
            //console.log('UPDATE build ', queryStr);

            tables.regAirService.fields.forEach(field => {
                if (!field.primaryKey && exist(field.name)){
                    //console.log(`${field.type} ${req.body[field.name].trim()} ${getValue(field.name, field.default)} ${getValue(field.name, field.default).length}`);
                    poolRequest.input(field.name, getType(field.type), getValue(field.name, field.default));
                    //console.log('f ',getValue(field.name, field.default));
                }
            });
            
            poolRequest.input("Id", sql.Int, req.params.id)
            poolRequest.query(queryStr);
            return poolRequest;
        } 
        
        try {
            const valid = validityData(req.body);
            //console.log('ADD V', valid);
            if (valid.length === 0) {                
                const pool = await poolPromise;
                const result = await build(pool.request());
                    
                //console.log('ADD Record', result);
                //res.json(result.recordset);

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