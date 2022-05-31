const Ligacoes = require('../models/ligacoes')

module.exports.listar = () => {
  // Procurar todos, com os campos id, nome e distrito
  return Ligacoes.find({}, { _id: 0 }).exec()
}