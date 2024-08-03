import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link,Outlet } from 'react-router-dom';


//componente da barra de navegação com links e efeito de mouse
function Navbar() {
    return (

        <Box >
            <AppBar position="static" >
                <Toolbar>
                   
                    <Typography variant="h6"  sx={{ flexGrow: 1 ,"&:hover":{textDecoration:"underline"}}} component={Link} to="/">
                        Home
                    </Typography>

                    <Typography variant="h6"  sx={{ flexGrow: 1 ,"&:hover":{textDecoration:"underline"}}}  component={Link} to="/taskform" >
                        Cadastro
                    </Typography>
                   
                </Toolbar>
            </AppBar>
            <Outlet/>
        </Box>
    )
} export default Navbar;