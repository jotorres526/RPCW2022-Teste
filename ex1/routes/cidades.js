var express = require('express');
var router = express.Router();
var Cidades = require('../controllers/cidades')

// Caso tenha uma querystring com o campo distrito, apenas responde com as cidades do distrito
// Caso contrário retorna todas as cidades
router.get('/', (req, res) => {
  Cidades.listar()
    .then(data => {
      if (req.query['distrito'] != undefined) {
        let cidades = []
        data.forEach(elem => {
          if (elem.distrito == req.query['distrito']) {
            cidades.push({ id: elem.id, nome: elem.nome})
          }
        })
        res.status(200).jsonp(cidades)
      } else {
        res.status(200).jsonp(data)
      }
    })
    .catch(err => {
      res.status(500).jsonp({ error: err })
    })
});

// Retorna lista de nomes ordenada alfabéticamente
router.get('/nomes', (req, res) => {
  Cidades.listar()
    .then(data => {
      let nomes = []
      data.forEach(elem => {
        nomes.push(elem.nome)
      })
      nomes = nomes.sort()
      res.status(200).jsonp(nomes)
    })
    .catch(err => {
      res.status(500).jsonp({ error: err })
    })
})

// Retorna toda a informação de uma cidade
router.get('/:id', (req, res) => {
  Cidades.consultar(req.params.id)
    .then(data => {
      res.status(200).jsonp(data)
    })
    .catch(err => {
      res.status(500).jsonp({ error: err })
    })
})

module.exports = router;
