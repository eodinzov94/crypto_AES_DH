import axios , { AxiosResponse } from 'axios';
import { SessionCreateResponse,MessageSendResponse,SessionDeleteResponse} from "../types/API_TYPES"


const API_URL ='http://localhost:3001'

export default class Service {
    static async createSession(name:string,prime:string,generator:string,publicKey:string) {
        return axios({
            url: `${API_URL}/create-session`,
            method: "POST",
            responseType: "json",
            data: {name,prime,generator,publicKey}
        }).then((response: AxiosResponse<SessionCreateResponse>) => {
            return response.data;
        });

    }
    static async deleteSession(sessionID:string,encName:string) {

        return axios({
            url: `${API_URL}/delete-session`,
            method: "DELETE",
            responseType: "json",
            data: {sessionID, encName}
        }).then((response: AxiosResponse<SessionDeleteResponse>) => {
            return response.data;
        });
    }
    static async sendMessage(sessionID:string,message:string) {
        return axios({
            url: `${API_URL}/send-message`,
            method: "POST",
            responseType: "json",
            data: {sessionID,message}
        }).then((response: AxiosResponse<MessageSendResponse>) => {
            return response.data;
        });
    }

}

