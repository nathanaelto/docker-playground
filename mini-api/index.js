const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('GET /');
  res.json({
    message: 'Hello World!'
  });
})

app.get('/about', (req, res) => {
  console.log('GET /about');
  res.json({
    message: 'About mini-api'
  });
})

app.get('/home', (req, res) => {
  console.log('GET /home');

  res.json({
    message: 'Home'
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})