const http = require('http');
// =========================
const app = require('./src/app')
require('dotenv').config()
const HOST_NAME = '127.0.0.1';
const PORT = process.env.PORT;

const server = http.createServer(app) 
server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});

