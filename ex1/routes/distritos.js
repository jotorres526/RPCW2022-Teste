var express = require('express');
var router = express.Router();
var Cidades = require('../controllers/cidades')


router.get('/', (req, res, next) => {
  Cidades.listar()
    .then(data => {
      let distritos = []
      let resp = []
      data.forEach(elem => {
        if (!distritos.includes(elem.distrito)) {
          distritos.push(elem.distrito)
        }
      })
      distritos.forEach(distrito => {
        let cidades = []
        data.forEach(elem => {
          if (elem.distrito == distrito) {
            cidades.push({ id: elem.id, nome: elem.nome })
          }
        })
        resp.push({ distrito: distrito, cidades: cidades})
      })
      res.status(200).jsonp(resp)
    })
    .catch(err => {
      res.status(500).jsonp({ error: err })
    })
});

module.exports = router;