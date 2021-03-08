//Importe do sequilize
const Sequelize = require("sequelize");

//Importe da conexão
const connection = require("./database");

/*Variável que armazena o model definindo o nome da tabela as
colunas e suas propriedades*/
const Pergunta = connection.define('pergunta',{
titulo:{
    type: Sequelize.STRING,
    allowNulll:false
},
descricao:{
    type:Sequelize.TEXT,
    allowNulll:false
}
});

/*Comando que sincroniza essa model com banco de dados
//caso não tenha uma tabela pergunta no banco de dados
ele irá criar*/
Pergunta.sync({force:false}).then(()=>{})

//Exportação do módulo 
module.exports = Pergunta;