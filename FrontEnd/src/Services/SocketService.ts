import { io, Socket} from "socket.io-client"
import VacationModel from "../Models/vacationModel";
import { registerAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationState";


class SocketService{
    private socket: Socket;

    public connect():void{
        this.socket = io("http://localhost:3030")
        this.listen();
        
    }
    private listen():void{
        this.socket.on("admin-added-vacation",(vacation:VacationModel)=>{
            alert("socket got adding message")
            store.dispatch(addVacationAction(vacation));
        });
        this.socket.on("admin-updated-vacation",(vacation:VacationModel)=>{
            store.dispatch(updateVacationAction(vacation));
        });
        this.socket.on("admin-delete-vacation",(id:number)=>{
            store.dispatch(deleteVacationAction(id))
        });
    }
    public disconnect():void{
        this.socket.disconnect()
    }
}

const socketService = new SocketService()
export default socketService