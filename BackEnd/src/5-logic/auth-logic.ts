import { ValidationError, UnauthorizedError } from './../4-models/errors-model';
import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import Role from '../4-models/role-model';


// Register 
async function register(user: UserModel): Promise<string> {
    const error = user.validatePost()
    if (error) {
        throw new ValidationError(error)
    }
    if(await isNameExist(user.userName)){
        throw new ValidationError(`This userName ${user.userName} is already exist`)
    }
    user.password = cyber.hash(user.password)
    user.role=Role.user
    const sql = `INSERT INTO users(firstName,lastName,userName,password,role)
    VALUES('${user.firstName}','${user.lastName}',
    '${user.userName}','${user.password}','${user.role}')`
    const result: OkPacket = await dal.execute(sql)
    user.userId = result.insertId
    const token = cyber.getNewToken(user)
    return token
}


// Login 
async function login(credentials: CredentialsModel): Promise<string> {

    const error = credentials.validatePost()
    if (error) {
        throw new ValidationError(error)
    }
    // credentials.password = cyber.hash(credentials.password)
    credentials.userName = credentials.userName.toLowerCase();
    let sql = `SELECT EXISTS(SELECT * FROM users WHERE userName = '${credentials.userName}' AND password = '${credentials.password}') as isExists`;
    const result = await dal.execute(sql);
    const isExists = result[0].isExists;

    if (isExists !== 1) {
        throw new UnauthorizedError("Incorrect userName or password");
    } 
    sql = `SELECT * FROM users WHERE username = '${credentials.userName}' AND password = '${credentials.password}'`;
    const user = await dal.execute(sql);

    const token = cyber.getNewToken(user);
    return token;
   
// Get all users
}
async function getAllUsers(): Promise<UserModel[]> {

    const sql = `SELECT * FROM users`;
    const users = await dal.execute(sql);
    return users

}

// name exist 
async function isNameExist(name: string): Promise<boolean>{
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE userName ='${name}') as isExists`;
    const result = await dal.execute(sql) ;
    const isExists = result[0].isExists
    return isExists ===1
  
  }

export default {
    register,
    login,
    getAllUsers
}
