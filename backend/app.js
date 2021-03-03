var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var server = require("http").Server(app);
var cors = require("cors");
require("./connection");
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(cors());

app.get("/api/", function (req, res, next) {
  res.json("online");
});

// cadastro publica

//app.post('/api/cadastro', usuarioController.new);

/*Login de Usuarios Admin*/
app.use("/api/", require("./app/usuario/auth"));

/*Mid para rotas da API verificar JWT*/
var jwt = require("./core/jwt");
app.use("/api/jwt", jwt);

/*Modulos*/
jwt.use("/ativo", require("./app/ativo"));
jwt.use("/usuario", require("./app/usuario"));
jwt.use("/feedback", require("./app/feedback"));

module.exports = server;