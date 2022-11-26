import {NextFunction,Response} from "express";
import {TypedRequestBody} from './RequestType'
import { validationResult } from 'express-validator'
import Service from './service'



class Controller {
    async createSession(req:TypedRequestBody<{name:string,prime:string,generator:string,publicKey:string}>,
                        res:Response, next:NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return next({status:400, message:'Validation Error', errors:errors.array()})
            }
            const { name, prime, generator, publicKey} = req.body;
            const [serverPublicKey,sessionID] = await Service.createSession(name, prime, generator, publicKey);
            res.json({ publicKey:serverPublicKey,sessionID });
        } catch (err) {
            next(err)
        }
    }
    async deleteSession(req:TypedRequestBody<{sessionID:string,encName:string,iv:string}>
                        , res:Response, next:NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next({status:400, message:'Validation Error', errors:errors.array()})
            }
            const { sessionID, encName,iv} = req.body;
            await Service.deleteSession(sessionID, encName,iv);
            res.json( {Result:'Success'});
        } catch (err) {
            next(err)
        }
    }
    async sendMessage(req:TypedRequestBody<{sessionID:string,message:string,iv:string}>
                      , res:Response, next:NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next({status:400, message:'Validation Error', errors:errors.array()})
            }
            const { sessionID, message,iv} = req.body;
            const [responseMessage,nextIV] = await Service.sendMessage(sessionID, message,iv);
            res.json( {message:responseMessage,iv:nextIV});
        } catch (err) {
            next(err)
        }
    }

}

export default new Controller()