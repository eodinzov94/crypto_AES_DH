import {AppBar, Toolbar, Typography} from "@mui/material";
import Steps from './components/Steps';
function App() {
  return (
    <div className="App">
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" >
                   Crypto
                </Typography>
            </Toolbar>
        </AppBar>
        <Steps/>
    </div>
  )
}

export default App
