import {AES,enc} from 'crypto-js'
// @ts-ignore
import {createDiffieHellman} from 'diffie-hellman/browser.js'


export const generateSharedKey =  async (prime: string, generator: string, clientPublicKey: string)  =>{
    const prime_buf     =   Buffer.from(prime,'hex')
    const gen_buff      =   Buffer.from(generator,'hex')
    const clientPK_buff =   Buffer.from(clientPublicKey,'hex')
    const server = createDiffieHellman(prime_buf, gen_buff)
    const serverPK_buff = server.generateKeys()
    const serverPublicKey =  Buffer.from(serverPK_buff).toString('hex')
    const sharedSecretKey = server.computeSecret(clientPK_buff)
    const sharedKey = Buffer.from(sharedSecretKey).toString('hex')
    console.log(sharedKey);
    return {sharedKey,serverPublicKey}
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
