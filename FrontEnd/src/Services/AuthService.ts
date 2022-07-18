import  axios  from 'axios';
import CredentialsModel from '../Models/CredentialsModel';
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';
import store from '../Redux/Store';
import config from '../Utils/Config';
import { UserModel } from './../Models/UserModel';
class AuthService{

   
     public async register(user: UserModel):Promise<void>{
        const response = await axios.post<string>(config.registerUrl,user);
        const token = response.data;
        store.dispatch(registerAction(token));
     }
     public async login(credentials: CredentialsModel ):Promise<void>{
        const response = await axios.post<string>(config.loginUrl,credentials);
        const token = response.data;
        
        store.dispatch(loginAction(token));
     }

    public logout():void{
        store.dispatch(logoutAction())

    }
    public isLoggedIn():boolean{
        return store.getState().authState.token !==null
    }
}


const authService= new AuthService()
export default authService