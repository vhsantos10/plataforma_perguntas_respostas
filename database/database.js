//Importe do sequelize 
const Sequelize = require('sequelize');

/*Instância do sequilize passando como parametro o banco
de dados para conexão o usuário, senha, host e o tipo de banco de dados*/
const connection = new Sequelize('', '', '',{
    host: 'localhost',
    dialect:'mysql'
});


//comando para exportar a conexão
module.exports = connection;