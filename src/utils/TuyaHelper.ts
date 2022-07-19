import { TuyaContext, TuyaResponse } from "@tuya/tuya-connector-nodejs";
import { config as dotenv } from 'dotenv';
import CustomError from "./CustomError";

dotenv();

type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

const tuya = new TuyaContext({
    baseUrl: process.env.TUYA_BASE_URL as string,
    accessKey: process.env.TUYA_ACCESS_ID as string,
    secretKey: process.env.TUYA_ACCESS_SECRET as string
})

export const TuyaRequest = async (method: Method, path: string, body: any) : Promise<any> => {
        // console.log([process.env.TUYA_BASE_URL, path].join(""))
        const resp = await tuya.request({
            method,
            path,
            body
        })
        if(!resp.success){
            console.log("error!")
        }else{
            return resp;
        }
}