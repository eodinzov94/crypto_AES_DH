import React, {FC, useState} from 'react';
import {Alert, Button, Container, TextField} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import {StepType} from "../types/StepType";
import LoadingButton from "@mui/lab/LoadingButton";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {generateDH_Key} from "../utils/crypto";
import {Buffer} from 'buffer'
import Service from "../api/API";
const Handshake:FC<StepType> = ({props}) => {
    const [generatingKey,setGenerationKey] = useState(false)
    const savedSession = localStorage.getItem("session")
    const loadSession = () => {
        if(!savedSession){
            return
        }
        const {name, sharedKey,sessionID} = JSON.parse(savedSession)
        props.setName(name)
        props.setSharedKey(sharedKey)
        props.setSessionID(sessionID)
        props.setCurrentStep(2)

    }
    const generateFunc = async ()=> {
            setGenerationKey(true)
            const client = await generateDH_Key().then(client => client);
            const clientPublicKey = Buffer.from(client.getPublicKey()).toString('hex')
            const prime = Buffer.from(client.getPrime()).toString('hex')
            const generator = Buffer.from(client.getGenerator()).toString('hex')
            props.setPrime(prime)
            props.setGenerator(generator)
            props.setClientPublicKey(clientPublicKey)
            props.setClient(client)
            setGenerationKey(false)
    }
    const connect = async () => {
        try{
            props.setLoading(true)
            const {publicKey,sessionID} = await Service.createSession(props.name,props.prime,props.generator,props.clientPublicKey)
            props.setSessionID(sessionID)
            props.setServerPublicKey(publicKey)
            props.setLoading(false)
            props.setCurrentStep((prev: number) => prev +1)
        }
       catch (e) {
           props.setPrime("")
           props.setGenerator("")
           props.setClientPublicKey("")
           props.setClient(null)
           props.setLoading(false)
       }
    }
    return (
        <Container maxWidth="sm">
            {!!savedSession && <div style={{display:"block"}}>
                <Alert severity="warning">
                    Log to the previous session
                    <Button variant="outlined"
                            color="secondary"
                            startIcon={<VpnKeyIcon />}
                            sx={{ml:"30px"}}
                            onClick={loadSession}
                    />

                </Alert>

            </div>}
            <TextField
                sx={{mt:"30px"}}
                disabled
                id="outlined-multiline-flexible"
                label={props.clientPublicKey.length>0 ? "Generated Key": "Generate Key First"}
                multiline
                rows={4}
                value={props.clientPublicKey}

            />
            <LoadingButton
                sx={{ml:"20px",mt:"30px"}}
                endIcon={<EmojiObjectsIcon />}
                loading={generatingKey}
                disabled={props.clientPublicKey.length > 0}
                loadingPosition="end"
                variant="contained"
                onClick={generateFunc}
            >
                Generate
            </LoadingButton>
            <TextField
                sx={{mt:"28px"}}

                disabled={props.clientPublicKey.length === 0}
                id="outlined-name"
                label={props.name.length>0 ? "Name":"Enter Name To Connect"}
                value={props.name}
                onChange={(e)=>props.setName(e.target.value)}
            />
            <LoadingButton
                sx={{ml:"20px",mt:"38px"}}
                endIcon={<LockIcon />}
                loading={props.isLoading}
                disabled={props.clientPublicKey.length === 0 || props.name.length === 0 }
                loadingPosition="end"
                variant="contained"
                onClick={connect}
            >
                Connect
            </LoadingButton>
        </Container>
    );
};

export default Handshake;