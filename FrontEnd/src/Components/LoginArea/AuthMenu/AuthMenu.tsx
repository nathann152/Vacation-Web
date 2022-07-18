import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

 function AuthMenu(): JSX.Element {

    // const [user,setUser]= useState<UserModel>() 
    // useEffect( ()=>{

    //     setUser(store.getState().authState.user);
    //     const unsubscribe= store.subscribe( ()=>{
    //       setUser(store.getState().authState.user) 
         
    //     });
    //     return unsubscribe

    // },[]);


    const [user,setUser]= useState<UserModel>()
    useEffect( ()=>{
        setUser(store.getState().authState.user);
        const unsubscribe= store.subscribe( ()=>{
            setUser(store.getState().authState.user)
            console.log(user);
            
        }
        );
        return unsubscribe
    },[]);


    return (
        <div className="AuthMenu">

           {user && <span>Hello {user.userName} | {user.firstName} <NavLink to="/logout">Logout</NavLink> </span>}

           {!user && <span>Hello Guest | <NavLink to="/login">Login</NavLink> | <NavLink to="/register">Register</NavLink> </span>}
			
        </div>
    );
}

export default AuthMenu;
