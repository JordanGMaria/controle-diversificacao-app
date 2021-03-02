var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var server = require("http").Server(app);
var path = require("path");
var cors = require("cors");

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

var config = require("./config");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true); //para tirar a chamada de wraning do mongo
mongoose.connect(config.database, {
  keepAlive: true,
  useNewUrlParser: true,
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

var port = parseInt(config.initialPort);

server.listen(port, "0.0.0.0");
console.log("Server start: " + port);
