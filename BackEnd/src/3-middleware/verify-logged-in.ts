import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";


async function verifyLoggedIn(request:any,response:Response,next:NextFunction){
try{
  const user = await cyber.getUser(request)
  request.user = user
   next()
}
catch(err:any){next(err)}

}
export default verifyLoggedIn