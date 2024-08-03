const express= require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./db/db')
const app= express()
const port =3000;


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get("/task",function(req,res){
     db.all("SELECT * FROM tasks",(err,row)=>{
        if(err){
            console.error(err.message)
            return
        }
        if(row){

            res.json(row)
        }
    })
})


app.get("task/:id",(req,res)=>{
    const id=req.params.id


    try{
        db.get("SELECT * FROM tasks WHERE id = ?",[id],(err,row)=>{
            if(err){
                console.error(err.message)
                res.status(404).json({error:"não há informação para retornar"})
                return
            }
            if(row){
                res.json(row)
            }
        })
    }
    catch(error){
        res.status(500).json({error:"erro na solicitação"})
    }
    
})



app.post("/add",(req,res)=>{
    const {title,describe,dateC,dateV}=req.body
    console.log(req.body)
   
    try{
        db.run("INSERT INTO  tasks (title,describe,dateC,dateV,status) VALUES(?,?,?,?,?)",[title,describe,dateC,dateV,"pendente"] ,(err)=>{
            if(err){
                console.error(err.message)
                res.status(500).json({error:"erro ao adicionar tarefa",err})
                
            }
            res.status(201).json({id:this.lastId,message:"nova tarefa adicionada"})
        })
        console.log("tarefa adicionada")
        
    }
    catch(error){
        res.status(500).json({error:"erro na solicitação"})

    }
  
})


app.put("/task/:id/update",(req,res)=>{
    const {id} = req.params
    const {title,describe,dateC,dateV,status}=req.body
   

    
    try{
        db.run("UPDATE tasks SET (title,describe,dateC,dateV,status) = (?,?,?,?,?)  WHERE id = ?",[title,describe,dateC,dateV,status,id],(err)=>{
            if(err){
                console.error(err.message)
                res.status(500).json({error:"erro ao atualizar tarefas"})
            }
            res.status(200).json({mesasge:"tarefa atualizada com sucesso"})
            
        })
       
        
    }
    catch(err){

        res.status(500).json({error:"erro na solicitação"})
    }
    
})

app.delete("/task/:id",(req,res)=>{
    const {id }= req.params
    console.log(id)
    try{
        db.run("DELETE FROM tasks WHERE id = ?",[id],(err)=>{
            if(err){
                console.error(err.message)
                res.status(500).json({error:"Erro ao excluir arquivo"})
            }
            res.status(200).json({message:"exclusão concluída"})
        })
        
    }
    catch(error){
        res.status(500).json({error:"erro na solicitação"})
    }
    
    
})


const server = app.listen(port,()=>{
    console.log("server está executando")
})

function closeServer(){
    server.close(()=>{
        db.close()
        console.log("server encerrado")
        process.exit(0)
    })
}

process.on('SIGINT',closeServer)
process.on('SIGTERM',closeServer)