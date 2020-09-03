const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 4001;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/api/auth/*", (req, res) => {
  // authServer
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:4003',
  });
});

app.all("/api/notes/*", (req, res) => {
  // noteServer
  apiProxy.web(req, res, {
    target: 'http://localhost:4002',
  });
});

app.all("/api/stats/*", (req, res) => {
  // authServer
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:4005',
  });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:4006',
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))