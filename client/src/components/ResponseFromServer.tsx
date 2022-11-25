import React, {FC, useState} from "react";
import {StepType} from "../types/StepType";
import {Button, Container, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ForumIcon from '@mui/icons-material/Forum';
const ResponseFromServer:FC<StepType> = ({setCurrentStep}) => {
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
                label={generatedKey.length>0 ? "Generated Symmetric Key": "Generate Symmetric Key"}
                multiline
                rows={4}
                value={generatedKey}

            />
            <LoadingButton
                sx={{ml:"20px",mt:"50px"}}
                endIcon={<EmojiObjectsIcon />}
                loading={isLoading}
                disabled={generatedKey.length > 0}
                loadingPosition="end"
                variant="contained"
                onClick={generateKeyFunc}
            >
                Generate
            </LoadingButton>
            <Button
                sx={{mt:"38px"}}
                variant="contained"
                disabled={generatedKey.length === 0}
                endIcon={<ForumIcon />}
                onClick={()=>setCurrentStep((prev: number) => prev +1)}
            >

                Exchange messages
            </Button>
        </Container>
    );
};

export default ResponseFromServer;