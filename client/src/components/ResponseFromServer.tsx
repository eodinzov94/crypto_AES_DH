import React, {FC, useState} from "react";
import {StepType} from "../types/StepType";
import {Button, Container, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ForumIcon from '@mui/icons-material/Forum';
import {generateSharedKey} from "../utils/crypto";
import {DiffieHellman} from "crypto";
const ResponseFromServer:FC<StepType> = ({props}) => {
    const keyGenerator = async ()=> {
        props.setLoading(true)
        const sharedKey = await generateSharedKey(props.client as DiffieHellman,props.serverPublicKey)
        props.setSharedKey(sharedKey)
        const data = {name:props.name , sharedKey}
        localStorage.setItem(props.sessionID, JSON.stringify(data))
        props.setLoading(false)
    }

    return (
        <Container maxWidth="sm">
            <TextField
                disabled
                id="outlined-multiline-flexible"
                label="Received Key"
                multiline
                rows={4}
                value={"2312325435435"}

            />
            <TextField
                sx={{mt:"38px"}}
                disabled
                id="outlined-multiline-flexible"
                label={props.sharedKey.length>0 ? "Generated Symmetric Key": "Generate Symmetric Key"}
                multiline
                rows={4}
                value={props.sharedKey}

            />
            <LoadingButton
                sx={{ml:"20px",mt:"50px"}}
                endIcon={<EmojiObjectsIcon />}
                loading={props.isLoading}
                disabled={props.sharedKey.length > 0}
                loadingPosition="end"
                variant="contained"
                onClick={keyGenerator}
            >
                Generate
            </LoadingButton>
            <Button
                sx={{mt:"38px"}}
                variant="contained"
                disabled={props.sharedKey.length === 0}
                endIcon={<ForumIcon />}
                onClick={()=>props.setCurrentStep((prev: number) => prev +1)}
            >

                Exchange messages
            </Button>
        </Container>
    );
};

export default ResponseFromServer;