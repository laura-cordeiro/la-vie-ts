"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Sequelize = require("sequelize");
const DB_NAME = "la-vie-ts";
const DB_USER = "root";
const DB_PASS = "Laura130694*";
const DB_CONFIG = {
    dialect: "mysql",
    host: "localhost",
    port: 3306
};
// objeto para guardar a conexão do banco dados
let db = {};
try {
    db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
}
catch (error) {
    console.error("Error ao tentar uma conexão com banco dados");
}
function hasConection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.authenticate();
            console.log("Banco dados conectado!");
        }
        catch (error) {
            console.error("Erro ao tentar se conectar ao banco de dados1");
        }
    });
}
Object.assign(db, {
    hasConection
});
module.exports = db;
