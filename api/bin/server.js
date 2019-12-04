const app = require('../src/app');
const http = require('http');

function normalizaPort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizaPort(process.env.PORT || '8080');



http.createServer(app).listen(port, () => {
    console.log(`App listening on port ${port}...`)
})

