import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";



function Logout(): JSX.Element {
 
    const navigate = useNavigate()
    
    useEffect(()=>{
       authService.logout();
       navigate("/home")
       alert("You have been successfully logged-out")
       return() =>{
        socketService.disconnect()
       }
    },[]);
    return;
}

export default Logout;
