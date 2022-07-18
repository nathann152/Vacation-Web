import fs from "fs/promises"
import { NextFunction, Request, Response } from "express";


const filePath = ""

async function logRequest(request : Request,response:Response,next : NextFunction){

const now = new Date()
const method= request.method;
const route = request.originalUrl
const data = `Time: ${now.toLocaleString()}, Method: ${method}, Route: ${route}`
await fs.appendFile(filePath,data)

next()
}


export default logRequest;