import TaskList from "../components/TaskList";
import { Box } from "@mui/material";
//componente da página inicial onde serão exibidas as tarefas. neste componente importasse a tasklist que mostrará as tarefas
function Home(){
    return(
        <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            <TaskList/>
        </Box>
    )
}export default Home;