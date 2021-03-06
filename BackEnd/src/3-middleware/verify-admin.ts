import { ForbiddenError } from './../4-models/errors-model';
import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import Role from "../4-models/role-model";


async function verifyAdmin(request:Request,response:Response,next:NextFunction){
    try{
        const role=cyber.getRole(request);
        if(role !== Role.admin){
            const err = new ForbiddenError("You are not admin")
            next(err)
        }
   next()
}
catch(err:any){next(err)}

}
export default verifyAdmin