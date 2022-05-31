const Cidades = require('../models/cidades')

module.exports.listar = () => {
  // Procurar todos, com os campos id, nome e distrito
  return Cidades.find({}, { _id: 0, id:1, nome:1, distrito:1 }).exec()
}

module.exports.consultar = (id) => {
  return Cidades.findOne({ id: id }, { _id:0 }).exec()
}