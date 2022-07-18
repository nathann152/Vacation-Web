import { NextFunction, Request, Response } from "express";

async function catchAll(err:any,request:Request,response:Response,next:NextFunction){
    const status = err.status || 500
    const message=err.message|| "UnKnow Error"

    if(status === 500){

         
    }
    response.status(status).send(message)
}
export default catchAll;