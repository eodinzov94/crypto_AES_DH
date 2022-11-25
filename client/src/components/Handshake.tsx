import React, {FC, useState} from 'react';
import {Alert, Button, Container, TextField} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import {StepType} from "../types/StepType";
import LoadingButton from "@mui/lab/LoadingButton";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
const Handshake:FC<StepType> = ({setCurrentStep}) => {
    const [name,setName] = useState("")
    const [generatedKey,setGeneratedKey] = useState("")
    const [isLoading, setLoading] = useState(false)
    const makeDelay = () => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }
    const generateKeyFunc = () => {
        makeDelay()
        setTimeout(()=>{
            setGeneratedKey("3242342342342432")
        },1000)

    }
    return (
        <Container maxWidth="sm">
            <div style={{display:"block"}}>
                <Alert severity="warning">
                    Log to the previous session
                    <Button variant="outlined"
                            color="secondary"
                            startIcon={<VpnKeyIcon />}
                            sx={{ml:"30px"}}
                    />

                </Alert>

            </div>
            <TextField
                sx={{mt:"30px"}}
                disabled
                id="outlined-multiline-flexible"
                label={generatedKey.length>0 ? "Generated Key": "Generate Key First"}
                multiline
                rows={4}
                value={generatedKey}

            />
            <LoadingButton
                sx={{ml:"20px",mt:"30px"}}
                endIcon={<EmojiObjectsIcon />}
                loading={isLoading}
                disabled={generatedKey.length > 0}
                loadingPosition="end"
                variant="contained"
                onClick={generateKeyFunc}
            >
                Generate
            </LoadingButton>
            <TextField
                sx={{mt:"28px"}}

                disabled={generatedKey.length === 0}
                id="outlined-name"
                label={name.length>0 ? "Name":"Enter Name To Connect"}
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <Button
                sx={{ml:"20px",mt:"38px"}}
                variant="contained"
                disabled={generatedKey.length === 0 || name.length === 0 }
                endIcon={<LockIcon />}
                onClick={()=>setCurrentStep((prev: number) => prev +1)}
            >

                Connect
            </Button>
        </Container>
    );
};

export default Handshake;