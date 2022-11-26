import {createDiffieHellman} from "crypto";
import {AES,enc} from 'crypto-js'
import hkdf from "futoin-hkdf";


export const generateSharedKey =  async (prime: string, generator: string, clientPublicKey: string)  =>{
    const server = createDiffieHellman(Buffer.from(prime,"hex"),Buffer.from(generator,"hex"))
    server.generateKeys()
    const sharedSecretKey = server.computeSecret(clientPublicKey,"hex","hex")
    console.log(sharedSecretKey);
    const sharedKey = await deriveSharedKey(sharedSecretKey)
    const serverPublicKey = server.getPublicKey().toString("hex")
    return [sharedKey,serverPublicKey]
}

const deriveSharedKey = async (sharedSecretKey:string) => {
    const derivedKey = hkdf(sharedSecretKey,16,{salt:'salt123',info:'info',hash:'SHA-512'})
    const key = Buffer.from(derivedKey).toString('hex')
    return key
}



export const encrypt =  async (text:string,key:string)=>{
    const cipher = AES.encrypt(text,key)
    return cipher.toString();
}

export const decrypt =  async (text:string,key:string)=>{
    const decipher = AES.decrypt(text,key)
    const decryptedData = JSON.stringify(decipher.toString(enc.Utf8))
    return decryptedData
}