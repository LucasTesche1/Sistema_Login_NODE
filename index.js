//INICIALIZADORES DE DEPENDÊNCIAS

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


//INICIALIZADORES DE SERVER
const port = 3000;
let path = require('path');
const app = express();


//VARIAVEIS DO SISTEMA PARA PEGAR O USER E A SENHA
let login = 'admin';
let password = '123456';


//LÓGICAS DA PÁGINA

//USE UTILIZADO PARA O CÓDIGO DA SESSÃO
app.use(session({secret:'nfsjhdnfshfbn2123ui23mm'}));
app.use(bodyParser.urlencoded({extended:true}));


//LÓGICA DE ROTA
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));


/**Função para verificar se os dados do formulário batem com o de login, se sim
 * leva ele a uma página de logado
 */


//RESPOSTA DO SISTEMA CASO O LOGIN E A SENHA ESTEJAM CERTOS
app.post('/',(req,res) =>{

    if(req.body.password == password && req.body.login === login){
        //Logado com sucesso!
        req.session.login = login;

        res.render('logado');
        console.log(`O meu usuário logado é: ${(req.session.login)}`);

    }else{
        res.render('index');
    }

})



//SISTEMA PELA AS INFORMAÇÕES DA RESPOSTA E ARMAZENA
app.get('/',(req,res)=>{

    if(req.session.login) {
        res.render('logado');
        

    }else{
        res.render('index');}
})


//CONFIRMAÇÃO DE SERVER FUNCTIONING
app.listen(port, ()=>{
    console.log('servidor rodando');
})