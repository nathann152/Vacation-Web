import { RouteNotFoundError } from './4-models/errors-model';
import vacationController from "./6-controllers/vacation-controller";
import authController from "./6-controllers/auth-controller"
import catchAll from "./3-middleware/catch-all";
import cors from "cors"
import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload"
import socketLogic from './5-logic/socket-logic';



const expressServer = express();


expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(expressFileUpload());

expressServer.use("/api",authController);
expressServer.use("/api",vacationController);

// Route not found
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
      const err = new RouteNotFoundError(request.method, request.originalUrl);
      next(err)
      
});

expressServer.use(catchAll);

const httpServer= expressServer.listen(3030, () =>console.log("Listening..."))

socketLogic.init(httpServer);







