import {Server as HttpServer} from "http"
import {Server as SocketServer,Socket }from "socket.io"
import VacationModel from "../4-models/vacation-model";

let socketServer:SocketServer; 

function init(httpServer: HttpServer):void{
    socketServer = new SocketServer(httpServer,{cors:{ origin: "*"}});
    socketServer.sockets.on("connection",(socket: Socket) =>{
        console.log("Client as been connected");
        
    });
}

function reportAddVacation(vacation:VacationModel):void{
    socketServer.sockets.emit("admin-added-vacation",vacation);
}
function reportUpdatedVacation(vacation:VacationModel):void{
    socketServer.sockets.emit("admin-updated-vacation",vacation);
}
function reportDeleteVacation(id:number):void{
    socketServer.sockets.emit("admin-delete-vacation",id);
}
export default {
    init,
    reportAddVacation,
    reportUpdatedVacation,
    reportDeleteVacation
}