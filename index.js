const http = require('http');
const fs = require('fs');
// =========================
const express = require('express');

const app = express();
const HOST_NAME = '127.0.0.1';
const PORT = process.env.PORT || 5000;

const server = http.createServer(app) 
// !!!!!!!!


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

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});
// const {summ} = require('./source');
// console.log(summ(10,20))
// const server = http.createServer((req, res) => {
//   const url = req.url;
//   console.log(`URL is ${url}`);
//   console.log(`METHOD is ${req.method}`);

//   res.setHeader('Content-Type', 'text/html; charset = utf-8');
//   // res.write('<h1>SErver</h1>')
//   // res.end()
//   switch (url) {
//     case '/':
//       console.log('Home page');
//       const homepage = fs.readFileSync('./public/index.html');
//       res.write(homepage);
//       res.end();
//       break;
//     case '/form':
//       console.log('Form')
//       const form = fs.readFileSync('./public/form.html');
//       res.write(form);
//       res.end()
//       break;
//     default:
//       res.write('<h1>Page not found</h1>');
//       res.end();
//   }
// });
// server.listen(PORT, HOST_NAME, () => {
//   console.log(`Server running at http://${HOST_NAME}:${PORT}`);
// });
