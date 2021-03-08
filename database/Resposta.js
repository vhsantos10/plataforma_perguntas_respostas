//Importe do sequilize
const Sequelize = require("sequelize");
//Importe da conexão
const connection = require("./database");

const Resposta = connection.define("respostas", {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false 
    },
    perguntaId:{
       type:Sequelize.INTEGER,
       allowNull: false
    }
});

Resposta.sync({force: false});


module.exports = Resposta;