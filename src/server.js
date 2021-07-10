const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

server.set('view engine', 'ejs')

//usar o req.body
server.use(express.urlencoded({ extended: true }))

//mudar a lolicaização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos statisc
server.use(express.static("public"))

//routes
server.use(routes)
server.listen(3000, () => console.log("Em execução na porta 3000"))