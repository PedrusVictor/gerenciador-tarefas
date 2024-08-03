
import { Box, TextField } from "@mui/material";
import TaskItem from "./TaskItem";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";


//componente para listar as tarefas
function TaskList() {

    const [itens, setItens] = useState([])

    const [statusF, setStatusF] = useState("tudo")
    const [titleF, setTitleF] = useState("")//campo usado para filtrar as tarefas pelo titulo

    //opções usadas no filtro
    const filtro = [
        {
            value: "tudo",
            label: "tudo"
        },
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


    //useEffct usado para carregas as informações das tarefas

    useEffect(() => {
        const LoadTaks = async () => {
            const response = await fetch("http://localhost:3000/task")
            if (!response.ok) {

                throw new Error("erro na solicitação:", response.statusText)
            }
            const data = await response.json()
            setItens(data)
        }
        LoadTaks()

    }, [])
    //contêiner para exibir as tarefas
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    defaultValue="tudo"
                    helperText="por favor selecione o status"
                    size="small"
                    onChange={(e) => setStatusF(e.target.value)}
                >
                    {filtro.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField label="Título" variant="outlined" value={titleF} onChange={(e) => setTitleF(e.target.value)} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "2em" ,width:"100%"}}>

                {itens && itens.filter((t) => (statusF=== "tudo" || t.status === statusF)&&t.title.includes(titleF) ).map((i, k) => (
                    <TaskItem key={k} task={i} setTask={setItens} />
                ))}
            </Box>
        </Box>
    )

    //filter é usado para filtrar e é passado os filtros pelas arrow function.
    // no caso de filtro por nome é usado a função includes para verificar se no titulo contem a palavra
} export default TaskList;