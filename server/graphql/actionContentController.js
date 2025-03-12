const fs = require('fs');
const path = require('path');
//var rawdata = fs.readFileSync(path.join(__dirname, '../query/queries.json'));
//var queries = JSON.parse(rawdata);
const tables = JSON.parse(fs.readFileSync(path.join(__dirname, '../query/tables.json')));

const {
    poolPromise,
    sql
} = require('../database/dboperation.js');


class ActionContentController {

    async getAllActionContent() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(tables.actionContent.queries.select);            
            return result.recordset;
        } catch (error) {
            return {}
        }
    }
    async getActionContentByID(id) {
        try {
            console.log("query to database ", id)
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .query(tables.actionContent.queries.selectById);
            // console.log("query to database return", result.recordset[0])
            return result.recordset;
        } catch (error) {
            console.log("query to database error")
            return {}
        }
    }
    //    ¯\_(ツ)_/¯
    async addActionContent(newActionContent) {
        console.log(newActionContent)
        if (newActionContent === undefined)
        {
            console.log('в функцию не передали значение')
            return {}
        }
        
        const hasProp = (obj, prop) =>  Object.prototype.hasOwnProperty.call(obj, prop) 
        
        //Валидация не нужна graphql сам запрашивает обязательные поля указанные в схеме
        const validityData = (actionContent => {
            const error = [];
            if (!hasProp(actionContent, "Action")) { error.push('Error Action is null');}
            if (!hasProp(actionContent, "Controller")) { error.push('Error Controller is null');}
            //if (!actionContent.hasOwnProperty("Action")) { error.push('Error Action is null');}
            // if (!actionContent.hasOwnProperty("Controller")) { error.push('Error Controller is null');}
            return error;
        });


        const createInsert = (add) => {            
            let newAdd = add;
            console.log(newAdd) 
            const fields =  Object.keys(newActionContent).join(',');
            console.log(fields) 
            const values =  Object.keys(newActionContent).map(fieldName => '@'+fieldName).join(',');
            console.log(values) 
                //return Object.values(req.body).map(v => {'@'+ v}).join(',');
        
            newAdd = newAdd.replace(/@FIELDS/gi, fields);
            newAdd = newAdd.replace(/@VALUES/gi, values);
            
            return newAdd;
        };

        const getValue = (property, defaultValue) => hasProp(newActionContent, property)?newActionContent[property]:defaultValue;
        const exist = (property) => hasProp(newActionContent, property);
                        
        const getType = (type) => { 
            //switch (type) {
                if (type.match(/datetime/)) { 
                    return sql.SmallDateTime;
                }
                if (type.match(/int/)) { 
                    return sql.Int;
                }
                if (type.match(/bit/)) {
                    return sql.Bit;
                }
                if (type.match(/ntext/)) {
                    return sql.VarChar(sql.MAX);
                }
                if (type.match(/nchar\([0-9]+\)/i))
                { return sql.NChar(type.exec("/nchar\((?<size>[0-9]+)\)/").size);}
                
                return sql.NChar(20);
            }
        
        const build = async function f(poolRequest) {
            
            tables.actionContent.fields.forEach(field => {
                if (!field.primaryKey && exist(field.name)){
                    console.log('ADD field ', field.name, field.type, getType(field.type), getValue(field.name, field.default));
                    poolRequest.input(field.name, getType(field.type), getValue(field.name, field.default));
                }
            });
            const queryStr = createInsert(tables.actionContent.queries.add);
            console.log(queryStr)
            poolRequest.query(queryStr);
            return poolRequest;
        } 
        
        try {
            // const valid = validityData(newActionContent);
            // console.log(valid)
            // if (valid.length === 0) {                
                const pool = await poolPromise;
                const result = await build(pool.request());  
                return result.recordset;
            // } else {                            }
        } catch (error) {
            console.log(error)
            
        } 
    }
    // UPDATE
    async updateActionContent(newActionContent){      

        const id = newActionContent["id"]

        const hasProp = (obj, prop) =>  Object.prototype.hasOwnProperty.call(obj, prop)

        const createUpdate = (update) => {
            let newUpdate = update;
                        
            const params =  
                Object.keys(newActionContent).filter(fn => fn!='id' && newActionContent[fn] != null).map(fieldName => `[${fieldName}] = @${fieldName}`).join(',');
        
            newUpdate = newUpdate.replace(/@PARAM/gi, params);
            //console.log('newUpdate ',newUpdate);

            return newUpdate;
        };

        const exist = (property) => hasProp(newActionContent, property)?newActionContent[property]!=null:false;
        
        const getValue = (property, defaultValue) => exist(property)?typeof newActionContent[property] == 'string'?newActionContent[property].trim():newActionContent[property]:defaultValue; 

        const getType = (type) => { 
                if (type.match(/datetime/)) { 
                    return sql.SmallDateTime;
                }
                if (type.match(/int/)) { 
                    return sql.Int;
                }
                if (type.match(/bit/)) {
                    return sql.Bit;
                }
                if (type.match(/ntext/)) {
                    return sql.VarChar(sql.MAX);
                }
                if (type.match(/nchar\([0-9]+\)/i))
                { return sql.NChar(type.exec("/nchar\((?<size>[0-9]+)\)/").size);}
                
                return sql.NChar(20);
            }

        const build = async function f(poolRequest) {            
            
            const queryStr = createUpdate(tables.actionContent.queries.edit);
            //console.log('UPDATE build ', queryStr);

            tables.actionContent.fields.forEach(field => {
                if (!field.primaryKey && exist(field.name)){
                    //console.log(`${field.type} ${req.body[field.name].trim()} ${getValue(field.name, field.default)} ${getValue(field.name, field.default).length}`);
                    poolRequest.input(field.name, getType(field.type), getValue(field.name, field.default));
                    //console.log('f ',getValue(field.name, field.default));
                }
            });
            console.log(queryStr)
            //poolRequest.input("Id", sql.Int, id)
            poolRequest.query(queryStr);
            return poolRequest;
        } 
        
        try {
                const pool = await poolPromise;
                const result = await build(pool.request());
                    
                //console.log('ADD Record', result);
                return result.recordset;
        } catch (error) {
            console.log(`Error add: ${error.message}`);
        } 

    }

    async deleteActionContent(id){
        try {
            console.log("query to database ", id)
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .query(tables.actionContent.queries.delete);
            // console.log("query to database return", result.recordset[0])
            return result.recordset;
        } catch (error) {
            console.log("query to database error")
            return {}
        }
    }
}

const actionContentController = new ActionContentController();
module.exports = actionContentController;