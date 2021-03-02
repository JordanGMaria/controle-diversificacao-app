const Model = require("./model");
const mongoose = require("mongoose");

exports.index = async (req, res) => {
  
  const aggregate = await Model.aggregate([
    { $match: { usuario: mongoose.Types.ObjectId(req.decoded._id) } },
    {
      $group: {
        _id: null,
        investido: { $sum: { $multiply: ["$quantidade", "$preco_medio"] } },
        atual: { $sum: { $multiply: ["$quantidade", "$preco"] } },
        notas: { $sum: "$nota" },
      },
    },
  ]);

  const filtro = {
    ativo: true,
    usuario: req.decoded._id,
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
    aggregate: aggregate[0],
  });
};

exports.aporte = async (req, res) => {
  const ativo = await Model.findById(req.body.ativo);

  if (!ativo) {
    res.json({
      success: false,
      err: "OPS!!! Ativo Não encontrado",
      form: req.body,
    });
  }

  const quantidade = parseInt(req.body.quantidade);
  const preco = parseFloat(req.body.preco);

  ativo.preco_medio = parseFloat(
    (ativo.preco_medio * ativo.quantidade + quantidade * preco) /
      (ativo.quantidade + quantidade)
  ).toFixed(2);

  ativo.quantidade += quantidade;

  const data = await ativo.save();

  if (data) {
    res.json({
      success: true,
      data,
    });
  } else {
    res.json({
      success: false,
      err: "OPS!!! Some error has ocurred",
      form: req.body,
    });
  }
};

exports.get = async (req, res) => {
  const data = await Model.findById(req.params.id);

  if (data) {
    res.json({
      data,
    });
  } else {
    res.json({
      success: false,
      err: "OPS!!! Some error has ocurred",
      form: req.body,
    });
  }
};

exports.new = async (req, res) => {
  var model = new Model(req.body);
  model.usuario = req.decoded._id;

  const data = await model.save();

  if (data) {
    res.json({
      success: true,
      data,
      form: req.body,
      res: "Criado com sucesso.",
    });
  } else {
    res.json({
      success: false,
      data,
      err: "OPS!!! Some error has ocurred",
      res: "Erro ao salvar aluno.",
      form: req.body,
    });
  }
};

exports.delete = async (req, res) => {
  const ativo = await Model.findById(req.params.id);
  ativo.ativo = false;

  const data = await ativo.save();

  if (data) {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
      err: "An error has occured",
    });
  }
};

exports.edit = async (req, res) => {
  const model = await Model.findById(req.body._id);

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
