const axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */

token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNjIxOCwiZXhwIjoxNjU0MDQ1MDE4fQ.TX9pKsucmKyXyzt5KkMdt6z_ztvbtM5QTsjg9BspZA2XLA7egQ8zlFOtPgy9mjDRA7cHqYxhV1-LxUDt5pj2xzb1T-8cZrjKuglSFQ7CXbYqeUw7hoeZZqg234AAzCNVDFwwi6jQ2msOHX1qO0H8l4y45TDtJICpJIqAF0hlC0oRuNybG80yiI1eXJgQsawqV0Wlfsd3U9e5M6swAIFO1hYqzQ_oc-8WW_D6Cxwqi1XOSsa2L4WVPN01_o6WvOOhMLclFvZIWLxoeRr00NGt7y0MkPY4A5d661Y3-1_KParvdRYFhXP7zFJ_R0cSqOorfa8EGEESzF8TfBWh1_eXvA'

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/classes', (req, res) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(data => {
      res.render('classes', {classes: data.data})
    })
    .catch(err => {
      res.render('error', { error: err })
    })
})


router.get('/termos', (req, res) => {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
    .then(data => {
      res.render('termos', { termos: data.data })
    })
    .catch(err => {
      res.render('error', { error: err })
    })
})


router.get('/:id', (req, res) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '?token=' + token)
    .then(resp => {
      res.render('classe', { classe: resp.data })
    })
    .catch(err => {
      res.render('error', { error: err })
    })
});

module.exports = router;
