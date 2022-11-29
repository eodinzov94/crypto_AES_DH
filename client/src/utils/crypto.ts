import {AES,enc} from 'crypto-js'
import {Buffer}from 'buffer'
// @ts-ignore
import {DiffieHellman,createDiffieHellman} from "crypto-browserify";

export const generateDH_Key =  ()  =>{
    return new Promise<DiffieHellman>((resolve,reject)=>{
        let client:DiffieHellman
        setTimeout(
            ()=>{
                client = createDiffieHellman(256)
                client.generateKeys()
                resolve(client)
            },0
        )

    })

}

export const generateSharedKey =  async (client:DiffieHellman, serverPublicKey: string)  =>{

    const sharedSecretKeyBuff = client.computeSecret(Buffer.from(serverPublicKey,'hex'))
    const sharedKey = Buffer.from(sharedSecretKeyBuff).toString("hex")
    console.log(sharedKey);
    return sharedKey
}




export const encrypt =  async (text:string,key:string)=>{
    const cipher = AES.encrypt(text,key)
    return cipher.toString();
}

export const decrypt =  async (text:string,key:string)=>{
    const decipher = AES.decrypt(text,key)
    const decryptedData = decipher.toString(enc.Utf8)
    return decryptedData
}
