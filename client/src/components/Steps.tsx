import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {StepContent} from '@mui/material';
import Handshake from "./Handshake";
import MessageExchange from "./MessageExchange";
import ClosedConnection from "./ClosedConnection";
import {useState} from "react";
import ResponseFromServer from "./ResponseFromServer";

const steps = [
    {text:'Init handshake with server', Component:Handshake },
    {text:'Response from server',Component:ResponseFromServer},
    {text:'Exchange messages',Component: MessageExchange},
    {text:'Close Connection',Component: ClosedConnection},
];


export default function HorizontalLabelPositionBelowStepper() {
    const [currentStep,setCurrentStep] = useState(0)

    return (
        <Box sx={{ width: '100%',mt: "100px"}}>
            <Stepper activeStep={currentStep} alternativeLabel nonLinear>
                {steps.map((step) => (
                    <Step key={step.text}>
                        <StepLabel>{step.text}</StepLabel>
                        <StepContent sx={{mt:"100px"}}>
                            {<step.Component setCurrentStep={setCurrentStep}/>}
                        </StepContent>


                    </Step>

                ))}
            </Stepper>
        </Box>
    );
}