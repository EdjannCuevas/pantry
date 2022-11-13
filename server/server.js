const express = require('express');
const cors = require('cors');
const db = require('../db/knex');
const path = require('path');

function setUpServer () {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.resolve(__dirname,'../client/build')));

    app.get('/pantry', async (req, res) => {
        try {
            const pantry = await db('pantry')
                .select('*');
            res.status(201).send(pantry);

        } catch (error) {
          console.log(error);  
        };
    });

    app.get('/pantry/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const item = await db('pantry')
                .select('*')
                .where({ id : id });
            res.status(201).send(item);

        } catch (error) {
            console.log(error);
        };
    });

    app.post('/pantry', async (req, res) => {
        try {
            await db('pantry')
                .insert(req.body);
            res.status(201).send('Success!');

        } catch (error) {
            console.log(error);
        };
    });

    app.put('/pantry/:id', async (req, res) => {
        try {
            const { id } = req.params;
            
            await db('pantry')
                .where({ id : id })
                .update(req.body, ['name', 'timestamp']);
            res.status(201).send('Updated!');

        } catch (error) {
            console.log(error);
        };
    });

    app.delete('/pantry/:id', async (req, res) => {
        try {
            const { id } = req.params;
            
            await db('pantry')
                .where({ id: id })
                .delete();
            res.status(201).send('Item was deleted!');

        } catch (error) {
            console.log(error);
        };
    });

    app.get('/ingredients', async (req, res) => {
        try {
            const ingredients = await db('ingredients')
                .select('*');
            res.status(201).send(ingredients);

        } catch (error) {
          console.log(error);  
        };
    });

    app.get('/ingredients/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const item = await db('ingredients')
                .select('*')
                .where({ pantry_id : id });
            res.status(201).send(item);

        } catch (error) {
            console.log(error);
        };
    });

    app.post('/ingredients', async (req, res) => {
        try {
            await db('ingredients')
                .insert(req.body);
            res.status(201).send('Success!');

        } catch (error) {
            console.log(error);
        };
    });

    app.put('/ingredients/:id', async (req, res) => {
        try {
            const { id } = req.params;
            
            await db('ingredients')
                .where({ pantry_id : id })
                .update(req.body, ['name', 'timestamp']);
            res.status(201).send('Updated!');

        } catch (error) {
            console.log(error);
        };
    });

    app.delete('/ingredients/:id', async (req, res) => {
        try {
            const { id } = req.params;
            
            await db('ingredients')
                .where({ pantry_id: id })
                .delete();
            res.status(201).send('Item was deleted!');

        } catch (error) {
            console.log(error);
        };
    });

    return app;
};

module.exports = setUpServer;