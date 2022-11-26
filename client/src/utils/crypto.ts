import {DiffieHellman,createCipheriv, createDecipheriv, createDiffieHellman, hkdfSync, randomBytes} from "crypto";



export const generateDH_Key =  async ()  =>{
    const client = createDiffieHellman(512)
    client.generateKeys()
    return client
}


export const generateSharedKey =  async (
    client:DiffieHellman,
    serverPublicKey: string)  =>{
    const sharedSecretKey = client.computeSecret(serverPublicKey,"hex","hex")
    const sharedKey = await deriveSharedKey(sharedSecretKey)
    return sharedKey
}

export const deriveSharedKey = async (sharedSecretKey:string) => {
    const derivedKey = hkdfSync('sha512',sharedSecretKey,'salt123','info',16);
    const key = Buffer.from(derivedKey).toString('hex')
    return key
}

export const generateIV  = async (IV_LENGTH:number)=>{
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
