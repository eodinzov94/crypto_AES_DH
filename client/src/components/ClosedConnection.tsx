import React, {FC} from 'react';
import {Button, Container, Typography} from "@mui/material";
import PowerOffIcon from '@mui/icons-material/PowerOff';
import ReplayIcon from '@mui/icons-material/Replay';
import {StepType} from "../types/StepType";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const ClosedConnection:FC<StepType> = ({setCurrentStep}) => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
               Connection closed
                <PowerOffIcon style={{marginLeft:"5px"}}/>
            </Typography>

            <Button
                sx={{ml:"20px",mt:"8px"}}
                variant="contained"
                color={"error"}
                endIcon={<DeleteForeverIcon />}
                onClick={()=>setCurrentStep(0)}
            >

                Clear current session
            </Button>


            <Button
                sx={{ml:"20px",mt:"18px"}}
                variant="contained"
                endIcon={<ReplayIcon />}
                onClick={()=>setCurrentStep(0)}
            >

                Play again
            </Button>
        </Container>
    );
};

export default ClosedConnection;