//Importação do Express
const express = require("express");
app = express();
//Importação do body parser
const bodyParser = require("body-parser");
//Importação do database.js
const connection = require("./database/database");
//Importe da model pergunta
const Pergunta = require("./database/Pergunta");
//Importe do modulo resposta
const Resposta = require("./database/Resposta");
//Método que faz o conexão com banco de dados
connection
.authenticate()
.then(()=>{
console.log("Conexão feita com o banco de dados!")
})
.catch((msgErro) =>{
console.log(msgErro);
})

//SSR server side rendering(EJS)
app.set('view engine','ejs');
//Arquivos estáticos
app.use(express.static('public'));

/*Permite que os dados sejam enviados do formulário
e sejam traduzidos em uma estrutura javascript*/
app.use(bodyParser.urlencoded({extended:false}))
//Esse comando permite ler dados de formulários enviados via JSON
app.use(bodyParser.json());

//Rota principal, busca todas as perguntas
app.get("/",(req, res) =>{
 
    //Método para buscar todas as perguntas no banco de dados
    Pergunta.findAll({raw:true,order:[
        ['id','DESC']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    })
   

});

//Rota para fazer as perguntas
app.get("/perguntar",(req,res) =>{
    res.render("perguntar");
})

//Rota para salvar pergunta
app.post("/salvarpergunta",(req,res) =>{
    
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //Método que salva a pergunta no banco 
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    }).catch((data) =>{
        console.log(data);
    })    
});

app.get("/pergunta/:id", (req, res) => {
    const id = req.params.id;
    Pergunta.findOne({
      where: { id: id }
    }).then(pergunta => {
      if (pergunta != undefined) {

        Resposta.findAll({
            where:{perguntaId: pergunta.id},
            order:[
                ['id','DESC']
            ]
        }).then(respostas =>{
            res.render("pergunta",{
                pergunta:pergunta,
                respostas:respostas
            });
        });
       
      } else {
        res.redirect("/");
      }
    });
});

//Rota para salvar respostas
app.post("/responder",(req, res) =>{
    
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    console.log(corpo, perguntaId);

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then((data) =>{
        res.redirect("/pergunta/"+perguntaId);
    })
})




//servidor express com a porta que a aplicação vai rodar
app.listen(8080, () =>{
    console.log("App Rodando");
})

