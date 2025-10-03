const fs = require('fs');
const path = require('path');
// ============================
const express = require('express');
// ==============================
const ActorController = require('./controllers/actorController');
const actorController = require('./controllers/actorController');
const app = express();
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(express.static(path.resolve( 'public')));
app.use(express.json());
// app.get('/', (req, res) => {
//   fs.readFile('./public/index.html', 'utf8', (error, data) => {
//     if (error) {
//       res.status(404);
//       throw err;
//     }
//     res.set('Content-Type', 'text/html').send(data);
//   });
// });
// app.get('/form', (req, res) => {
//   fs.readFile('./public/form.html', 'utf8', (error, data) => {
//     if (error) {
//       res.status(404);
//       throw err;
//     }
//     res.set('Content-Type', 'text/html').send(data);
//   });
// });
// app.get ('/download', (req, res) => {
//   console.log('download');
//   res.download(path.join(__dirname, 'test', 'test'))
// })
// app.get('/fm', (req, res) => {
//   res.redirect('/form')
// })
// app.get('/codes', (req, res) => {
//   console.log(req.query);
//   const id = req.query.id;
//   const code = req.query.code;
//   console.log(`Id is ${id}, code is ${code}`)
//   res.send(`Id is ${id}, code is ${code}`)
// })
app.get('/actors', actorController.getActors);
app.get('/actors/:id', actorController.getActorById)
app.post('/actors/', actorController.createActor);
app.put('/actors/:id', actorController.updateActor)
app.delete('/actors/:id', actorController.deleteActor)
module.exports = app;