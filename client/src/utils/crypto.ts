import hkdf from 'futoin-hkdf'
import {AES,enc} from 'crypto-js'
import {DiffieHellman,createDiffieHellman} from "diffie-hellman";


export const generateDH_Key = ()  =>{
    const client =  createDiffieHellman(512)
    client.generateKeys()
    return client
}


export const generateSharedKey =  async (
    client:DiffieHellman,
    serverPublicKey: string)  =>{
    const sharedSecretKey = client.computeSecret(serverPublicKey,"hex","hex")
    console.log(sharedSecretKey);
    const sharedKey = await deriveSharedKey(sharedSecretKey)
    return sharedKey
}

export const deriveSharedKey = async (sharedSecretKey:string) => {
    const derivedKey = hkdf(sharedSecretKey,16,{salt:'salt123',info:'info',hash:'SHA-256'})
    const key = Buffer.from(derivedKey).toString('hex')
    return key
}



export const encrypt =  async (text:string,key:string)=>{
    const cipher = AES.encrypt(text,key)
    return cipher.toString();
}

export const decrypt =  async (text:string,key:string)=>{
    const decipher = AES.decrypt(text,key)
    console.log(decipher);
    const decryptedData = JSON.stringify(decipher.toString(enc.Utf8))
    console.log(decryptedData);
    return decryptedData
}
