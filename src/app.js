const fs = require('fs');
// ============================
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', (error, data) => {
    if (error) {
      res.status(404);
      throw err;
    }
    res.set('Content-Type', 'text/html').send(data);
  });
});
app.get('/form', (req, res) => {
  fs.readFile('./public/form.html', 'utf8', (error, data) => {
    if (error) {
      res.status(404);
      throw err;
    }
    res.set('Content-Type', 'text/html').send(data);
  });
});

module.exports = app;