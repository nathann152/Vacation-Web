import { RouteNotFoundError } from './../4-models/errors-model';
import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import logic from "../5-logic/vacation-logic";
import path from "path"
import fs from "fs"
import vacationLogic from '../5-logic/vacation-logic';
import verifyAdmin from '../3-middleware/verify-admin';
import cyber from '../2-utils/cyber';




const router = express.Router();


router.get(`/vacations` ,verifyLoggedIn, async (request: any, response: Response, next: NextFunction) => {
        const userId= +request.user.userId;
        const vacations = await logic.getAllVacations(userId);
        response.json(vacations)
});


//GET http://localhost:3030/api/vacations/2 <--- id 
router.get("/vacations/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacations(id);
        response.json(vacation)
    }
    catch (err: any) {
        next(err)
    }
});

//POST http://localhost:3030/api/vacations
router.post("/vacations" ,verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addVacation = await logic.addVacation(vacation);
        response.status(201).json(addVacation)
    }
    catch (err: any) {
        next(err)
    }
});

//PUT http://localhost:3030/api/vacations/ <---- id
router.put("/vacations/:id([0-9]+)", verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        request.body.id = +request.params.id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await logic.updateFullVacation(vacation);
        response.json(updatedVacation)
    }
    catch (err: any) {
        next(err)
    }
});

//PATCH http://localhost:3030/api/vacations/ <---- id
router.patch("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await logic.updatePartialVacation(vacation);
        response.json(updatedVacation)
    }
    catch (err: any) {
        next(err)
    }
});

//DELETE http://localhost:3030/api/vacations/ <---- id
router.delete("/vacations/:id([0-9]+)",verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err)
    }
});
router.get("/vacations/image/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1- assets", "images", imageName);
        
        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl)
        }
        response.sendFile(absolutePath)
        
    }
    catch (err: any) {
        next(err)
    }


});

router.post('/followVacation/:vacationId', async (request: Request, response) => {
    try {
        const vacationId =+request.params.vacationId
        const userId =cyber.getUser(request).userId; 
        const sendInfo = await vacationLogic.followVacation(userId,vacationId);
        response.json(sendInfo);
    } catch (error) {
        response.status(500).send(error);
    }
});



//delete http://localhost:3030/api/followVacation/:vacationId/:userId
router.delete("/followVacation/:vacationId/",verifyLoggedIn,async (request: any, response) => {
    try {
        const userId= +request.user.userId; 
        const vacationId = +request.params.vacationId;
        await vacationLogic.deleteFollowedVacation(userId, vacationId);
        response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error);

    }
});


export default router;


