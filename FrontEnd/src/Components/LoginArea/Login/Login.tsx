import "./Login.css";
import { useForm } from "react-hook-form"
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { NavLink } from "react-router-dom";
import socketService from "../../../Services/SocketService";

function Login(): JSX.Element {

    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm<CredentialsModel>()

    async function send(user: CredentialsModel) {
        try {
            if(user.userName === "nathan152"){
                await authService.login(user)
                alert("You have been login successfully!")
                socketService.connect() 
                navigate("/admin")
            }else{
                await authService.login(user)
                alert("You have been login successfully!")
                socketService.connect()
                navigate("/home")
            }
        }
        catch (err: any) { alert(err.message) }

     
    }
    return (
        <div className="Login Box">
            	<h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>


            <label>Username:</label>
            <input type="text"{...register("userName")} />

            <label>Password:</label>
            <input type="Password"{...register("password")} />

            <button>Login</button>
            
            <NavLink to={"/register"}>Click to Register</NavLink> 
            </form>
        </div>
    );
}

export default Login;
