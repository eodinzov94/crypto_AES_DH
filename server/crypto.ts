import {createCipheriv, createDecipheriv, createDiffieHellman, hkdfSync, randomBytes} from "crypto";



export const generateSharedKey =  async (prime: string, generator: string, clientPublicKey: string)  =>{
    const server = createDiffieHellman(Buffer.from(prime,"hex"),Buffer.from(generator,"hex"))
    server.generateKeys()
    const sharedSecretKey = server.computeSecret(clientPublicKey,"hex","hex")
    const sharedKey = await deriveSharedKey(sharedSecretKey)
    const serverPublicKey = server.getPublicKey().toString("hex")
    return [sharedKey,serverPublicKey]
}

const deriveSharedKey = async (sharedSecretKey:string) => {
    const derivedKey = hkdfSync('sha512',sharedSecretKey,'salt123','info',16);
    const key = Buffer.from(derivedKey).toString('hex')
    return key
}

export const generateIV  = async (IV_LENGTH:number = 16)=>{
    const iv = randomBytes(IV_LENGTH).toString('hex').slice(0, IV_LENGTH);
    return iv
}

export const encrypt =  async (text:string,key:string,iv:string)=>{
    const cipher = createCipheriv("aes-256-ccm", key, iv)
    const encryptedText = `${cipher.update(text,'utf8','hex')}${cipher.final('hex')}`
    return encryptedText;
}

export const decrypt =  async (text:string,key:string,iv:string)=>{
    const decipher = createDecipheriv("aes-256-ccm", key, iv)
    const decryptedText = `${decipher.update(text,'hex','utf8')}${decipher.final('utf8')}`
    return decryptedText;
}
