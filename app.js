const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());


mongoose.connect("mongodb://"+ process.env.admin +":"+ process.env.mdp +"@"+ process.env.bdd +":41643/bddnumber");

const projectId = 'romand-johann-2018';

const Schema = mongoose.Schema;

var inputSchema = new Schema({
    number: Number,
});

var Input = mongoose.model('Input', inputSchema);


app.get('/generate', function(req, res){
    let number = Math.floor(Math.random() * 100) + 1;
    let message = 'number : ' + number;

    Input.create({
        'number' : number,
    }, function(err, input){
        if(err) res.status(400).json({ 'message':'Something went wrong during the creation of the input.', 'error': err });

        Input.find({}, function (err, input) {
            if(err) res.status(400).json({ 'message':'Something went wrong during the creation of the input.', 'error': err });

            let value = [];

            for(var i = 0; i < input.length; i++){
                value.push(input[i].number);
            }

            res.json({'input':value, 'message':'send'});
        })
    });
});

app.get('/get', function (req, res) {
   Input.find({}, function (err, input) {
       if(err) res.status(400).json({ 'message':'Something went wrong during the creation of the input.', 'error': err });

       let value = [];

       for(var i = 0; i < input.length; i++){
           value.push(input[i].number);
       }

       res.json({'input':value, 'message':'send'});
   })
});

app.use(function(req, res, next){
   res.setHeader('Content-Type', 'text/plain');
   res.status(404).send('Page introuvable');
});

app.listen(8083);

console.log('Start...');

module.exports = app;
