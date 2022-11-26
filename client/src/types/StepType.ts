import React from "react";
import {DiffieHellman} from "crypto";

export interface StepType {
    props:{
        setCurrentStep: React.Dispatch<React.SetStateAction<number>>
        IV:string
        setIV:React.Dispatch<React.SetStateAction<string>>
        name:string
        setName:React.Dispatch<React.SetStateAction<string>>
        isLoading:boolean
        setLoading:React.Dispatch<React.SetStateAction<boolean>>
        sharedKey:string
        setSharedKey:React.Dispatch<React.SetStateAction<string>>
        sessionID:string
        setSessionID:React.Dispatch<React.SetStateAction<string>>
        prime:string
        setPrime:React.Dispatch<React.SetStateAction<string>>
        generator:string
        setGenerator:React.Dispatch<React.SetStateAction<string>>
        clientPublicKey:string
        setClientPublicKey:React.Dispatch<React.SetStateAction<string>>
        client:DiffieHellman | null
        setClient:React.Dispatch<React.SetStateAction<DiffieHellman | null>>
        serverPublicKey:string
        setServerPublicKey:React.Dispatch<React.SetStateAction<string>>

    }

}