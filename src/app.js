const fs = require('fs');
const path = require('path');
// ============================
const express = require('express');
// ==============================
const {getTime, showTime} = require('./middleware/time.mw')
const actorController = require('./controllers/actorController');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve( 'public')));

app.use('/time', getTime, showTime);
// app.use(showTime);

app.get('/actors', actorController.getActors);
app.get('/actors/:id', actorController.getActorById)
app.post('/actors/', actorController.createActor);
app.put('/actors/:id', actorController.updateActor)
app.delete('/actors/:id', actorController.deleteActor)
module.exports = app;

