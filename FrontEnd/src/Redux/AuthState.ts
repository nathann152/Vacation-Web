import { ThirtyFpsSharp } from "@mui/icons-material";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel"

export class AuthState {
    public token: string = null
    public user: UserModel = null

    public constructor(){
        this.token = localStorage.getItem("token")
        if(this.token){
            this.user = (jwtDecode(this.token)as any).user
        }
    }
}
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any

 
}

export function registerAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Register, payload: token }
    return action
}
export function loginAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Login, payload: token }
    return action
}
export function logoutAction(): AuthAction {
    const action: AuthAction = { type: AuthActionType.Logout }
    return action
}
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState }

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            const token = action.payload;
            newState.token = token
            newState.user = (jwtDecode(token) as any).user  
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
            
        case AuthActionType.Logout:
            newState.token = null
             newState.user = null
             localStorage.removeItem("token")
             
            break;
    }
    return newState
}