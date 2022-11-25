import React, {FC, useState} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {Container, Divider, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import {StepType} from "../types/StepType";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const MessageExchange:FC<StepType> = ({setCurrentStep}) => {
    const [msg,setMsg] = useState("")
    const [encMsg,setEncMsg] = useState("")
    const [msgFromServer,setMsgFromServer] = useState("")
    const [encMsgFromServer,setEncMsgFromServer] = useState("")
    return (
        <Container maxWidth="sm">
            <TextField
                id="outlined-multiline-flexible"
                label="Write text"
                multiline
                rows={4}
                value={msg}
                onChange={(e)=>setMsg(e.target.value)}

            />
            <LoadingButton
                sx={{ml:"20px",mt:"30px"}}
                endIcon={<SendIcon />}
                loading={false}
                loadingPosition="end"
                variant="contained"
            >
                Send
            </LoadingButton>
            <TextField
                sx={{mt:"30px"}}
                id="outlined-multiline-flexible"
                label="Encrypted text"
                multiline
                rows={4}
                disabled
                value={encMsg}
                onChange={(e)=>setEncMsg(e.target.value)}
            />
            <Divider style={{marginTop:"30px"}}>
               <Typography variant="button" display="block" gutterBottom>
                   <ExpandCircleDownIcon/> Response from server <ExpandCircleDownIcon/>
                </Typography>
            </Divider>
            <TextField
                sx={{mt:"30px"}}
                id="outlined-multiline-flexible"
                label="Decrypted from server"
                multiline
                rows={4}
                disabled
                value={msgFromServer}

            />
            <TextField
                sx={{mt:"30px"}}
                id="outlined-multiline-flexible"
                label="Encrypted from server"
                multiline
                rows={4}
                disabled
                value={encMsgFromServer}

            />
            <LoadingButton
                sx={{ml:"30px", mt:"140px"}}
                endIcon={<PhonelinkEraseIcon />}
                loading={false}
                loadingPosition="end"
                variant="contained"
                color={"warning"}
                onClick={()=>setCurrentStep((prev: number) => prev +1)}
            >
                Close
            </LoadingButton>

        </Container>
    );
};

export default MessageExchange;