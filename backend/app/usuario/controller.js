const Model = require("./model");

exports.index = async (req, res) => {
  const filtro = {
    ativo: true,
  };

  let query = Model.find(filtro);

  if (!req.body.all) {
    query.skip(req.body.skip || 0);
    query.limit(req.body.limit || 5);
  }
  let data = await query.exec();

  const total = await Model.find(filtro).count();

  res.json({
    total,
    data,
  });
};

exports.get = async (req, res) => {
  const data = await Model.findOne({
    _id: req.params.id,
  });
  res.json(data);
};

exports.getMe = async (req, res) => {
  const data = await Model.findOne({
    _id: req.decoded._id,
  });
  res.json(data);
};

exports.new = async (req, res) => {
  try {
    const buscaUser = await Model.findOne({
      email: req.body.email,
    });

    if (buscaUser)
      return res.json({
        success: false,
        err: "Email já cadastrado!",
      });

    var model = new Model(req.body);

    const data = await model.save();

    if (data) {
      res.json({
        success: true,
        data,
      });
    } else {
      res.json({
        success: false,
        data,
        err: req.cfg.erros.padrao,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      err: "Erro ao cadastrar",
    });
  }
};

exports.delete = async (req, res) => {
  const model = await Model.findOne({
    _id: req.params.id,
  });

  if (model) {
    model.ativo = false;
    await model.save();
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
      err: req.cfg.erros.padrao,
    });
  }
};

exports.edit = async (req, res) => {

  const model = await Model.findById(req.body._id);

  const emailExistente = await Model.findOne({ email: req.body.email, _id: { $ne: req.decoded._id }});

  if(emailExistente){
    return res.json({
      success: false,
      form: req.body,
      err: "Email já registrado por outro usuário.",
    });
  }

  for (key in req.body) {
    model[key] = req.body[key];
  }

  const data = await model.save();

  if (data) {
    res.json({
      success: true,
      data,
      form: req.body,
      res: "Atualizado com sucesso.",
    });
  } else {
    res.json({
      success: false,
      data,
      err: "Erro ao tentar salvar",
      form: req.body,
      res: "Erro ao atualizar.",
    });
  }
};
