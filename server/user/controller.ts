import {NextFunction,Response} from "express";
import {TypedRequestBody} from './RequestType'
import Service from './service'



class Controller {
    async createSession(req:TypedRequestBody<{name:string,prime:string,generator:string,publicKey:string}>,
                        res:Response, next:NextFunction) {
        try {
            const { name, prime, generator, publicKey} = req.body;
            const {serverPublicKey,sessionID} = await Service.createSession(name, prime, generator, publicKey);
            res.json({ publicKey:serverPublicKey,sessionID });
        } catch (err) {
            next(err)
        }
    }
    async deleteSession(req:TypedRequestBody<{sessionID:string,encName:string}>
                        , res:Response, next:NextFunction) {
        try {
            const { sessionID, encName} = req.body;
            await Service.deleteSession(sessionID, encName);
            res.json( {Result:'Success'});
        } catch (err) {
            next(err)
        }
    }
    async sendMessage(req:TypedRequestBody<{sessionID:string,message:string}>
                      , res:Response, next:NextFunction) {
        try {
            const { sessionID, message} = req.body;
            const responseMessage = await Service.sendMessage(sessionID, message);
            res.json( {message:responseMessage});
        } catch (err) {
            next(err)
        }
    }

}

export default new Controller()