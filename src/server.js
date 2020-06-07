//o const "express" pode ter outro nome
// o argumento dentro da require que tbm leva o nome de "express" que está na node_modules
//

const express = require("express")
const server = express() //está executando a função  require que foi atribuida a const express

//conectando ao banco de dados
const db = require("./database/db") 

// configurando pasta public

server.use(express.static("public"))

//habilitando o uso do req.body para possibilitar o envio do corpo do formulá via POST
server.use(express.urlencoded({extended:true}))

// colocando engine em todos os htmls
const nunkucks = require("nunjucks")
nunkucks.configure("src/views", {

    express:server,
    noCache: true

})
  

//configurar caminhos da aplicação
//página inicial
//req:requisição
//res: resposta

server.get("/", (req,res) =>{

   return res.render("index.html" ,{title: "um título"})

})




server.get("/create-point", (req,res) =>{



    //req.query: query strings da nossa url

    // console.log(req.query)

    return res.render("create-point.html")

})

server.post("/savepoint", (req,res) =>{
    
    ///**conceituando funcionalidades */
    //req.body: o corpo do nosso formulário
    // console.log(req.body)

    //inserir dados valendo
   
    const query =`INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES(?,?,?,?,?,?,? );`
    const values=[

        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
       

    ]
    function afterInsertData(err){{
        if(err){
             console.log(err)
             return res.sed("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        
        return res.render("create-point.html",{saved:true})
    }}
    db.run(query, values, afterInsertData)   
    

  
})


server.get("/search", (req,res) =>{

    const search = req.query.search

    if(search == ""){

        return res.render("search-results.html",{total:0}) 
    }



    // //3 consultar dados na tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
        if(err){
            console.log(err)

        }
        // console.log("Aqui estão seus registros:")
        // console.log(rows)
        const total = rows.length
        //mostar o html com os dados do banco
        return res.render("search-results.html",{places: rows, total:total}) //se chave e valor tiver o mesmo nome posso colocar apenas um, ou seja, total: toal pode ser soment total

    })


   
    // return res.render("search-results.html")
    // ,{places: rows}

})

//ligando servido na porta 300
server.listen(3000)  ///listen é ouvir