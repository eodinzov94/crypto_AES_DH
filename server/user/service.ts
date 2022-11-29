import {db} from '../db'
import {decrypt,encrypt,generateSharedKey} from '../crypto'


class Service {
    async createSession(name:string,prime:string,generator:string,publicKey:string) {
        const sessionID = Date.now().toString()
        const {sharedKey,serverPublicKey} = await generateSharedKey(prime,generator,publicKey)
        await db.push("/"+sessionID,{name,sharedKey})
        return {serverPublicKey,sessionID}
    }
    async deleteSession(sessionID:string,encName:string) {
        const {name,sharedKey} = await db.getData("/"+sessionID)
        if(!name){
            throw "Session does not exists"
        }
        const decryptedName = await decrypt(encName,sharedKey)
        if (name != decryptedName){
            console.log(name);
            console.log(decryptedName);
            throw "Wrong name or shared key"
        }
        await db.delete("/"+sessionID)
    }
    async sendMessage(sessionID:string,message:string) {
        const {name,sharedKey} = await db.getData("/"+sessionID)
        if(!name){
            throw "Session does not exists"
        }
        const decryptedMessage = await decrypt(message,sharedKey)
        const messageToEncrypt = `Received from client: ${decryptedMessage}`
        const responseMessage = encrypt(messageToEncrypt,sharedKey)
        return responseMessage
    }

}

export default new Service();