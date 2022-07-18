import { Request } from 'express';
import { UnauthorizedError } from './../4-models/errors-model';
import jwt from "jsonwebtoken"
import UserModel from '../4-models/user-model';
import Role from '../4-models/role-model';
import crypto  from "crypto";


function hash(plainText){

    if(!plainText) return null;
    const hashText = crypto.createHash("sha512").update(plainText).digest("hex")
    return hashText
}

const secret = "cool secret string"

function getNewToken(user: UserModel):string{
    const payload= {user}
    const token = jwt.sign(payload,secret ,{expiresIn:"5d"})
    return token
}


function verifyToken(request: Request):Promise<boolean>{
  return new Promise<boolean>((resolve,reject)=>{
     
    const header= request.headers.authorization;
    if(!header){
        reject (new UnauthorizedError("No token sent"))
        return;
    }
    const token = header.substring(7);
    if(!token){
        reject (new UnauthorizedError("No token sent"))
        return;
    }
    jwt.verify(token, secret, (err, payload)=>{
        if(err){
            reject (new UnauthorizedError("Invalid or expired token"))
              return;
        }
    resolve(true)
    })
  });


}
function getTokenRole(request:Request): Role{
    const header = request.headers.authorization;
    const token = header.substring(7);
    const payload= jwt.decode(token)
     console.log(payload);
    const user = (payload as any).user
    return user.role

}

function getUser(request: Request): UserModel {
    const header = request.headers.authorization;
    const token = header.substring(7)
    const payload = jwt.decode(token);
    const user = (payload as any).user[0]
    return user
}

function getRole(request: Request):Role {
    const result = getUser(request);
    const user = (result as UserModel);
    return user.role
}

export default {
    getNewToken,
    verifyToken,
    getUser,
    getRole,
    getTokenRole,
    hash
}