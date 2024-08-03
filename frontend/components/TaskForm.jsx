import { Box, TextField, Button, Typography } from "@mui/material";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//import de classes necessárias para usar um select de data

import { useState } from "react";

import { useNavigate } from "react-router-dom";

//importação do elemento para poder mudar de página
// form para criação de tarefas
function TaskForm() {

    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [describe, setDescribe] = useState("")
    const [selectedDate, setSelectedDate] = useState(null);

    //variaveis usadas pelo form
    const [error,setError]=useState(null)//variavel para armazenar informação de erro para servir de aviso ao usuário

    const addTask = async () => {

        //tratamente de erros para evitar que haja dados em branco

        if(!title||!describe||!selectedDate){
            setError("campos não preenchidos")
            return
        }
        const date = new Date()

        //objeto para pegar a data atual. usada para o registro de criação da tarefa
        //bloco try e catch para consumir api para criação de tarefa
        try {
            const response = await fetch("http://localhost:3000/add", {

                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    title: title,
                    describe: describe,
                    dateC: date.toDateString(),
                    dateV: selectedDate.format("YYYY-MM-DD"),
                })
            })
            

            //se o houver algum erro no fetch é mostrado um erro
            if (!response.ok) {
                setError("Erro no servidor")
                throw new Error(`erro fetch statys:${response.status}`)
            }
            //const data = await response.json()
            console.log("tarefa adicionada")

            //console para informar que uma tarefa foi adicionada

            navigate("/")//mudar para a pagina inicial
        }

        //catch de tratamento de erro, e informar ao usuário
        catch (error) {
            console.error("erro ao adicionar tarefa")
            setError("Erro ao adicionar tarefa")
        }





    }

    //componentes do formulário
    return (




        <Box sx={{ display: "flex", flexDirection: "column", margin: "auto" }}>
            {error && <Typography>{error}</Typography>}

            <Typography variant="h2">Nova tarefa</Typography>
            <TextField label="Título" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField
                id="outlined-multiline-static"

                label="Descrição"
                multiline
                rows={4}

                value={describe} onChange={(e) => setDescribe(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Basic date picker" onChange={setSelectedDate}/>
                </DemoContainer>
            </LocalizationProvider>

            <Button variant="contained" color="success" onClick={addTask}>Adicionar Tarefa</Button>

        </Box>


    )
} export default TaskForm;