import  {Router} from "express"
import {body} from "express-validator"
import Controller from "./controller"

const router = Router()
router.post("/create-session",
    body('name').isLength({min: 1})
        .withMessage('Please enter a valid name'),
    body('prime').isLength({min: 64, max: 64})
        .withMessage('Prime number must be 512 bits'),
    body('generator').isLength({min:5}).withMessage('Generator should be of correct length'),
    body('publicKey').isLength({min:5}).withMessage('Public Key should be of correct length'),
    Controller.createSession
);
router.delete("/delete-session",
    body('sessionID').isLength({min:5})
        .withMessage('sessionID should be of correct length'),
    body('encName').isLength({min:1})
        .withMessage('Name should be of correct length'),
    body('iv').isLength({min:1})
        .withMessage('IV is undefined'),
    Controller.deleteSession
);

router.delete("/send-message",
    body('message').isLength({min:1})
        .withMessage('Message should be at least len of 1 char'),
    body('sessionID').isLength({min:1})
        .withMessage('sessionID should be of correct length'),
    body('iv').isLength({min:1})
        .withMessage('IV is undefined'),
    Controller.sendMessage

);

export default router