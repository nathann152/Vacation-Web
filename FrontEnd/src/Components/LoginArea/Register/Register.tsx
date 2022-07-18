import UserModel from "../../../Models/UserModel";
import "./Register.css";
import {useForm} from "react-hook-form"
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";



function Register(): JSX.Element {
    const navigate = useNavigate()
      const  {register, handleSubmit, formState}= useForm<UserModel>()
      
async function send(user:UserModel){
    try{
        await authService.register(user)
        alert("You have been register successfully!")
        navigate("/home")
    }
    catch(err:any){alert(err.message)}
}
    return (
        <div className="Register  Box">
			<h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>


                <label>First Name:</label>
                <input type="text"{...register("firstName")}/>

                <label>Last Name:</label>
                <input type="text"{...register("lastName")}/>

                <label>Username:</label>
                <input type="text"{...register("userName")}/>

                <label>Password:</label>
                <input type="Password"{...register("password")}/>
                
            <button>Register</button>

            </form>
        </div>
    );
}

export default Register;
