// importar dependencia do sqlit3
const sqlite3 = require("sqlite3").verbose()

//criar objeto que irá fazer operações no banco de dado

const db = new sqlite3.Database("./src/database/database.db")

module.exports=db

//utilizar o objeto de banco de dados para nossas operações

 db.serialize(() => {

    // //criar tabela

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     ); 
    
    
    
    
    // `)

    // //inserir dados
    // const query =`INSERT INTO places (
    //     image,
    //     name,
    //     address,
    //     address2,
    //     state,
    //     city,
    //     items
    // ) VALUES(?,?,?,?,?,?,? );`
    // const values=[
    //     "https://images.unsplash.com/photo-1560452265-74a9a3b351cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, lâmpadas "

    // ]
    // function afterInsertData(err){{
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }}
    // db.run(query, values, afterInsertData)           

    //3 consultar dados na tabela
    // db.all(`SELECT * FROM places`, function(err,rows){
    //     if(err){
    //         console.log(err)

    //     }
    //     console.log("Aqui estão seus registros:")
    //     console.log(rows)

    // })


    // 4 deletar dados da tabela
        // db.run(`
        // DELETE FROM places WHERE id = ? `,[1], function(err){
        //     if(err){
        //         return console.log(err)
        //     }
        //     console.log("Registros deletado com sucesso")
        // })
    
 })