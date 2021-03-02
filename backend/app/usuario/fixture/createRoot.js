const Model = require('./../model');
const config = require('../../../config');
const mongoose = require('mongoose');
const to = require('./../../../core/to');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
});

(async function start() {
  console.log('cadastrar user root');

  let rootExists = await Model.findOne({ email: 'root@admin.com.br' });
  if (rootExists) {
    console.log('user root ja existente');
  } else {
    var model = new Model({
      email: 'root@admin.com.br',
      password: 'admin@2021',
      nome: 'Administrador',
      root: true
    });

    const [err, data] = await to(model.save());

    if (!err && data) {
      console.log('user root cadastrado');
    } else {
      console.log('ocorreu um erro ao cadastrar o root', err);
    }
  }
})();
