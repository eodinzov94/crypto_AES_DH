export interface Response{
    message?:string
    errors?: any[]
}

export interface SessionDeleteResponse extends Response{
    result: "Success"
}

export interface SessionCreateResponse extends Response{
    publicKey:string
    sessionID:string
}

export interface MessageSendResponse extends Response{
    message:string
    iv:string
}
