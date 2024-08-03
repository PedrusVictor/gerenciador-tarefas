import { Box, TextField } from "@mui/material"

//importação necessárias para o card
import MenuItem from "@mui/material/MenuItem";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


//importação de elementos para o select de data que será usado na hora de setar as informações de data de vencimento
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//importação da classe para definir o formato...ela é necessária para poder converter a informação salva no servidor num formato que o select date entenda para mostrar
import dayjs from 'dayjs';
import { useState } from "react"


//componente do item, card para mostrar as informações das tarefas. pedesse 2 parametros, 
//o primeiro são as informações da tarefa(title...etc), o segundo é o a função de modificação de estado da lista de tarefas
function TaskItem({ task, setTask }) {
    const [title, setTitle] = useState("")
    const [describe, setDescribe] = useState("")
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("")
    const [showEdit, setShowEdit] = useState(false)//variavel para informar que o modo de edição está ativado



    //função de deletar tarefa
    async function delTask(id) {

        //possui a parte de consumir api do servidor node para deletar e em seguida altera os componentes em react para não mostrar os elementos deletados

        try {
            const response = await fetch(`http://localhost:3000/task/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error(`erro na exclusão : ${response.statusText}`)
            }
            setTask(prev => prev.filter(t => t.id !== id))



        }
        catch (error) {

            console.error("erro na solicitação:", error)

        }
    }
//lista com as opções de estado que serão usadas no select

    const currencies = [
        {
            value: "pendente",
            label: "pendente"
        },
        {
            value: "em andamento",
            label: "em andamento"
        },
        {
            value: "concluido",
            label: "concluído"
        }
    ]

    //função para resetar as informações que serão carregadas sempre o botão editar for ativado.
    //isso foi necessário para ter certeza de que a infomação mostrada vai ser sempre a atualizada


    const resetData=()=>{
        setTitle(task.title)
        setDescribe(task.describe)
        setDate(task.dateV)
        setStatus(task.status)
    }

    //função de atualizar informações da tarefa
    async function updateTask(id) {
        
        const editTask = {title:title,describe:describe,dateC:task.dateC,dateV:date,status:status}
        
        try {
            const response = await fetch(`http://localhost:3000/task/${id}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(editTask)

            })
            if (!response.ok) {
                throw new Error(`erro na exclusão : ${response.statusText}`)
            }

//atualizando as informações da tarefa...caso o id da tarefa for igual ao indicado, as informações serão alteradas, se não, continua com as mesma informações
            setTask(prev=>prev.map((t)=>t.id===id?editTask:t))

            setShowEdit(false)
            resetData()


        }
        catch (error) {
            console.error("error na solicitação:", error)
        }
    }

    ///informações do card + campos de edição caso o modo de alterar seja ativado
    return (
        <Box sx={{ minWidth: 275,maxWidth:275 }}>
            <Card>
               
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>

                    {showEdit ?
                        <TextField label="Título" variant="outlined" size="small" value={task.title} onChange={(e) => setTitle(e.target.value)}></TextField>
                        : <Typography sx={{ fontSize: 14 }}>{task.title}</Typography>}

                    <Box>
                        <Typography>Descrição:</Typography>
                        {showEdit ? <TextField label="Descrição" variant="outlined" size="small" value={task.describe} onChange={(e)=>setDescribe(e.target.value)}></TextField>
                            : <Typography>{task.describe}</Typography>}


                    </Box>

                    <Box>
                        <Typography>Data de vencimento : </Typography>
                        {showEdit ?
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Data de vencimento" value={dayjs(task.dateV)} onChange={setDate} />
                                </DemoContainer>
                            </LocalizationProvider>
                            : <Typography>{task.dateV}</Typography>}

                    </Box>
                    <Box>
                        <Typography>Status : </Typography>
                        {showEdit ?
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                Value={task.status}
                                helperText="por favor selecione o status"
                                size="small"
                                onChange={(e)=>setStatus(e.target.value)}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            : <Typography>{task.status}</Typography>}

                    </Box>








                </CardContent>

                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>

                    <Button variant="outlined" onClick={() => {
                        setShowEdit(show => show ? false : true)
                        resetData()

                    }}>{showEdit?"Cancelar":"Editar"}  </Button>
                    {showEdit?
                    <Button variant="outlined" color="success" onClick={()=>updateTask(task.id)}>Confirmar</Button>
                    :<Button variant="outlined" onClick={() => delTask(task.id)}>Deletar</Button>}
                    
                    
                </CardActions>

            </Card>
        </Box>)
} export default TaskItem