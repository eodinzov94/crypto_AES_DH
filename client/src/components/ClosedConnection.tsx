import React, {FC, useState} from 'react';
import {Button, Container, Typography} from "@mui/material";
import PowerOffIcon from '@mui/icons-material/PowerOff';
import ReplayIcon from '@mui/icons-material/Replay';
import {StepType} from "../types/StepType";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Service from "../api/API";
import {encrypt} from "../utils/crypto";
const ClosedConnection:FC<StepType> = ({props}) => {

    const clearStorage = () => {
        props.setPrime("")
        props.setGenerator("")
        props.setClientPublicKey("")
        props.setServerPublicKey("")
        props.setSessionID("")
        props.setName("")
        props.setSharedKey("")
        props.setClient(null)
        props.setCurrentStep(0)
    }
    const clearSession = async () => {
        try{
            const data = await Service.deleteSession(props.sessionID,await encrypt(props.name,props.sharedKey))
            localStorage.removeItem("session")
            clearStorage()
        }
        catch (e) {
            console.log(e);
        }
    }
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
                onClick={clearSession}
            >

                Clear session & play
            </Button>


            <Button
                sx={{ml:"20px",mt:"18px"}}
                variant="contained"
                endIcon={<ReplayIcon />}
                onClick={clearStorage}
            >

                Play again
            </Button>
        </Container>
    );
};

export default ClosedConnection;