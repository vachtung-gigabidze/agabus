const fs = require('fs');
const path = require('path');
var rawdata = fs.readFileSync(path.join(__dirname, '../query/queries.json'));
var queries = JSON.parse(rawdata);
const {
    poolPromise,
    sql
} = require('../database/dboperation.js');

const {
    graphqlHTTP
} = require('express-graphql');
const schema = require('../graphql/schema');



class MainController {

    graphqlHTTP() {
        const infoItems = [{
            id: 1,
            ItemType: 'News'
        }];
        const root = {
            getAllInfoItem: () => {
                    return infoItems
                }
                // async () =>{
                //     try {
                //         const pool = await poolPromise;
                //         const result = await pool.request().query(queries.getAllInfoItem);
                //         res.json(result.recordset);
                //     } catch (error) {
                //         res.status(500);
                //         res.send(error.message);
                //     }
                // }
                ,
            //getInfoItem: ({id}) => this.getByIdInfoItem({id})
            // ,
            // createInfoItem: ({
            //     input
            // }) => {
            //     const infoItem = createInfoItem(input);
            //     infoItems.push(infoItem);
            //     return infoItem;
            // }
        }

        graphqlHTTP({
            schema,
            graphiql: true,
            rootValue: root,
        })
    }



    async getByIdInfoItem({
        id
    }) {
        try {
            if (id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input("id", sql.Int, id)
                    .query(queries.getByIdInfoItem);

                res.json(result.recordset);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(`Error: ${error.message}`);
        }
    }

    async getAllActionContent(req, res) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(queries.getAllActionContent);
            res.json(result.recordset);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async getByIdActionContent(req, res) {
        try {
            if (req.params.id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input("id", sql.Int, req.params.id)
                    .query(queries.getByIdActionContent);

                res.json(result.recordset);
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500);
            res.send(`Error: ${error.message}`);
        }
    }

    async addActionContent(req, res) {
        const validityData = (data) => {
            const error = [];
            if (data.Action == null) {
                error.push('Error action is null')
            }
            if (data.Controller == null) {
                error.push('Error Controller is null')
            }
            if (data.Name == null) {
                error.push('Error Name is null')
            }
            if (data.Content == null) {
                error.push('Error Content is null')
            }
            if (data.Description == null) {
                error.push('Error Description is null')
            }
            if (data.Owner == null) {
                error.push('Error Owner is null')
            }
            if (data.IsActive == null) {
                error.push('Error IsActive is null')
            }
            if (data.DataArea == null) {
                error.push('Error DataArea is null')
            }
            if (data.OrderKey == null) {
                error.push('Error OrderKey is null')
            }
            if (data.Context == null) {
                error.push('Error Context is null')
            }
            if (data.RecVersion == null) {
                error.push('Error RecVersion is null')
            }
            if (data.ChangeDate == null) {
                error.push('Error ChangeDate is null')
            }
            if (data.CntSubHdr == null) {
                error.push('Error CntSubHdr is null')
            }
            if (data.CntFooter == null) {
                error.push('Error CntFooter is null')
            }
            if (data.ImageKey == null) {
                error.push('Error ImageKey is null')
            }
            if (data.IsExStyle == null) {
                error.push('Error IsExStyle is null')
            }
            if (data.QRUrl == null) {
                error.push('Error QRUrl is null')
            }
            return error;
        };
        try {
            const valid = validityData(req.body);
            console.log('ADD', valid);
            if (valid.length === 0) {
                console.log('ChangeDate ', req.body.ChangeDate);
                const pool = await poolPromise;
                const result = await pool.request()
                    .input("Action", sql.NChar(100), req.body.Action)
                    .input("Controller", sql.NChar(100), req.body.Controller)
                    .input("Name", sql.NChar(100), req.body.Name)
                    .input("Content", sql.NText, req.body.Content)
                    .input("Description", sql.NChar(300), req.body.Description)
                    .input("Owner", sql.Int, req.body.Owner)
                    .input("IsActive", sql.Bit, req.body.IsActive)
                    .input("DataArea", sql.NText, req.body.DataArea)
                    .input("OrderKey", sql.Int, req.body.OrderKey)
                    .input("Context", sql.NChar(3), req.body.Context)
                    .input("RecVersion", sql.Int, req.body.RecVersion)
                    .input("ChangeDate", sql.SmallDateTime, req.body.ChangeDate)
                    .input("CntSubHdr", sql.NText, req.body.CntSubHdr)
                    .input("CntFooter", sql.NText, req.body.CntFooter)
                    .input("ImageKey", sql.NChar(20), req.body.ImageKey)
                    .input("IsExStyle", sql.Bit, req.body.IsExStyle)
                    .input("QRUrl", sql.NChar(512), req.body.QRUrl)
                    .query(queries.addActionContent);
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
    async updateActionContent(req, res) {
        const validityData = (data) => {
            const error = []
            if (data.id == null) {
                error.push('Error Id is null')
            }
            if (data.Action == null) {
                error.push('Error action is null')
            }
            if (data.Controller == null) {
                error.push('Error Controller is null')
            }
            if (data.Name == null) {
                error.push('Error Name is null')
            }
            if (data.Content == null) {
                error.push('Error Content is null')
            }
            if (data.Description == null) {
                error.push('Error Description is null')
            }
            if (data.Owner == null) {
                error.push('Error Owner is null')
            }
            if (data.IsActive == null) {
                error.push('Error IsActive is null')
            }
            if (data.DataArea == null) {
                error.push('Error DataArea is null')
            }
            if (data.OrderKey == null) {
                error.push('Error OrderKey is null')
            }
            if (data.Context == null) {
                error.push('Error Context is null')
            }
            if (data.RecVersion == null) {
                error.push('Error RecVersion is null')
            }
            if (data.ChangeDate == null) {
                error.push('Error ChangeDate is null')
            }
            return error
        }
        try {
            //console.log(validityData(req.body));
            if (validityData(req.body).length === 0 //&&
                // req.body.cntSubHdr != null &&
                // req.body.cntFooter != null &&
                // req.body.imageKey != null &&
                // req.body.isExStyle != null &&
                // req.body.qRUrl != null
            ) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input("Id", sql.Int, req.params.id)
                    .input("Action", sql.NChar(100), req.body.Action)
                    .input("Controller", sql.NChar(100), req.body.Controller)
                    .input("Name", sql.NChar(100), req.body.Name)
                    .input("Content", sql.NText, req.body.Content)
                    .input("Description", sql.NChar(300), req.body.Description)
                    .input("Owner", sql.Int, req.body.Owner)
                    .input("IsActive", sql.Bit, req.body.IsActive)
                    .input("DataArea", sql.NText, req.body.DataArea)
                    .input("OrderKey", sql.Int, req.body.OrderKey)
                    .input("Context", sql.NChar(3), req.body.Context)
                    .input("RecVersion", sql.Int, req.body.RecVersion)
                    .input("ChangeDate", sql.SmallDateTime, req.body.ChangeDate)
                    .input("cntSubHdr", sql.NText, req.body.cntSubHdr)
                    .input("cntFooter", sql.NText, req.body.cntFooter)
                    .input("imageKey", sql.NChar(20), req.body.imageKey)
                    .input("isExStyle", sql.Bit, req.body.isExStyle)
                    .input("qRUrl", sql.NChar(512), req.body.qRUrl)
                    .query(queries.updateActionContent);
                res.json(result.recordset);
            } else {
                //console.log('error');
                res.send('Please fill all the details!');
            }
        } catch (error) {
            res.status(500);
            res.send(`Error: ${error.message}`);
        }
    }

    async deleteActionContent(req, res) {
        try {
            if (req.params.id != null) {
                const pool = await poolPromise;
                const result = await pool.request()
                    .input("id", sql.Int, req.params.id)
                    .query(queries.deleteActionContent);

                res.json(result.recordset);
            }
        } catch (error) {
            res.status(500);
            res.send(`Error: ${error.message}`);
        }
    }

    async index(req, res) {
        res.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
    }
   
    async editAC(req, res) {
        res.sendFile(path.resolve(__dirname, '../../client', 'editAC.html'));
    }
    async addAC(req, res) {
        res.sendFile(path.resolve(__dirname, '../../client', 'addAC.html'));
    }
}

const controller = new MainController();
module.exports = controller;