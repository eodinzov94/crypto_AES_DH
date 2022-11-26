import {db} from '../db'
import {decrypt,encrypt,generateIV,generateSharedKey} from '../crypto'


class Service {
    async createSession(name:string,prime:string,generator:string,publicKey:string) {
        const sessionID = Date.now().toString()
        const [sharedKey,serverPublicKey] = await generateSharedKey(prime,generator,publicKey)
        await db.push(sessionID,{name,sharedKey})
        return [serverPublicKey,sessionID]
    }
    async deleteSession(sessionID:string,encName:string,iv:string) {
        const {name,sharedKey} = await db.getData(sessionID)
        if(!name){
            throw "Session does not exists"
        }
        const decryptedName = decrypt(encName,sharedKey,iv)
        if (name != decryptedName){
            throw "Wrong name or shared key"
        }
        await db.delete(sessionID)
    }
    async sendMessage(sessionID:string,message:string,iv:string) {
        const {name,sharedKey} = await db.getData(sessionID)
        if(!name){
            throw "Session does not exists"
        }
        const decryptedMessage = decrypt(message,sharedKey,iv)
        const messageToEncrypt = "Received from client:" +decryptedMessage
        const nextIV = await generateIV()
        const responseMessage = encrypt(messageToEncrypt,sharedKey,nextIV)
        return [responseMessage,nextIV]
    }

}

export default new Service();