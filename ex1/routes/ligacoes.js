var express = require('express');
var router = express.Router();
var Ligacoes = require('../controllers/ligacoes')
var Cidades = require('../controllers/cidades')


router.get('/', (req, res) => {
   Ligacoes.listar()
    .then(data => {
      if (req.query['origem'] != undefined) {
        var resp = []
        data.forEach(elem => {
          if (elem.origem == req.query['origem']) {
              Cidades.consultar(elem.destino)
              .then(cidade => {
                let obj = {
                  id: elem.id,
                  id_dest: elem.destino,
                  nome_dest: cidade.nome
                }
                return obj
                
              })
              .catch(err => {
                res.status(501).jsonp({ error: err })
              })
          }
        })
        res.status(200).jsonp(resp)

      } else if (req.query['dist'] != undefined) {
        data.forEach(elem => {

        })
      }
    })
    .catch(err => {
      res.status(500).jsonp({ error: err })
    })
});

module.exports = router;
