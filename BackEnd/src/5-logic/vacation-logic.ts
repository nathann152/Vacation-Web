import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid"
import socketLogic from "./socket-logic";



async function getAllVacations(userId: number): Promise<VacationModel[]> {
    const sql =
     `
    SELECT DISTINCT
	V.*,
	EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ${userId}) AS isFollowing,
	COUNT(F.userId) AS followersCount
    FROM vacations as V LEFT JOIN followers as F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY isFollowing DESC
    `
    const vacations = await dal.execute(sql);
    return vacations
}

async function getAllVacations1(): Promise<VacationModel[]> {
    const sql =
   `SELECT * FROM vacations
    `
    const vacations = await dal.execute(sql);
    return vacations
}




//Get one vacation 
async function getOneVacations(id: number): Promise<VacationModel> {

    const sql = `SELECT * FROM vacations WHERE VacationId = ${id}`;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0]
    if (!vacation) {
        throw new ResourceNotFoundError(id)
    }
    return vacation

}

//follow vacations
async function followVacation(userId: number, vacationId: number):Promise<void> {
    const sql = `INSERT INTO followers(userId,vacationId) VALUES(${userId} ,${vacationId})`;
    await dal.execute(sql);

}

// show followed vacations
async function getFollowedVacations(userId) {
    const sql = `SELECT vacationId FROM followers 
    where ${userId} = userId`;
    const vacations = await dal.execute(sql);
    return vacations;
}


// delete followedVacation 
async function deleteFollowedVacation(userId, vacationId) {
    const sql = `DELETE FROM followers WHERE userId = ${userId} and vacationId = ${vacationId}`;
    await dal.execute(sql);
}


// display all followed vacation 
async function getAllFollowCount() {
    const sql = `SELECT 
                    v.vacationId as vacations , 
                    Count(*) as followers 
                    FROM followers f 
                    LEFT JOIN vacations v ON v.vacationId = f.vacationId 
                    GROUP BY f.vacationId`;
    const followers = await dal.execute(sql);
    return followers;
}


// Add one Vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validatePost()
    if (error) {
        throw new ValidationError(error)
    }
    if (await isNameExist(vacation.destination)) {
        throw new ValidationError(`This destination ${vacation.destination} is already exist`)
    }

    if (vacation.image) {

        const dotIndex = vacation.image.name.lastIndexOf(".")
        const extension = vacation.image.name.substring(dotIndex)
        vacation.imageName = uuid() + extension

        await vacation.image.mv("./src/1- assets/images/" + vacation.imageName);
        delete vacation.image
    }
    const sql = `INSERT INTO vacations(destination,description,fromDate,untilDate,price, imageName)
                 VALUES('${vacation.destination}','${vacation.description}',
                 '${vacation.fromDate}','${vacation.untilDate}',${vacation.price},'${vacation.imageName}')`

    const result: OkPacket = await dal.execute(sql)
    vacation.id = result.insertId
    const addedVacation = await getOneVacations(vacation.id)
    socketLogic.reportAddVacation(addedVacation)
    return addedVacation;
}

// Update full vacation 

async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validatePut()
    if (error) {
        throw new ValidationError(error)
    }
    if (vacation.image) {

        const dotIndex = vacation.image.name.lastIndexOf(".")
        const extension = vacation.image.name.substring(dotIndex)
        vacation.imageName = uuid() + extension

        await vacation.image.mv("./src/1- assets/images/" + vacation.imageName);
        delete vacation.image
    }

    const sql =
        `UPDATE vacations SET
                 destination='${vacation.destination}',
                 description = '${vacation.description}',
                 fromDate='${fixDateFormat(vacation.fromDate)}',
                 untilDate='${fixDateFormat(vacation.untilDate)}',price=${vacation.price},
                 imageName ='${vacation.imageName}'
                 WHERE vacationId = ${vacation.id}`

    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(vacation.id)
    }
    socketLogic.reportUpdatedVacation(vacation)
    return vacation;

}

// update partial vacation
async function updatePartialVacation(vacation: VacationModel): Promise<VacationModel> {
    const error = vacation.validatePatch()
    if (error) {
        throw new ValidationError(error)
    }

    const dbVacation = await getOneVacations(vacation.id);
    for (const prop in dbVacation) {
        if (vacation[prop] !== undefined) {
            dbVacation[prop] = vacation[prop]
        }
    }
    const updatedVacation = await updateFullVacation(new VacationModel(dbVacation));
    return updatedVacation
}

// Delete vacation

async function deleteVacation(id: number): Promise<void> {
    const sql = `DELETE FROM vacations WHERE vacationId = ${id}`
    const result = await dal.execute(sql);
    // const imagePath = "./src/1- assets/images/" + vacation.imageName
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(id)
    }
    socketLogic.reportDeleteVacation(id)
}




// Checks if Name exists
async function isNameExist(name: string): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM vacations WHERE destination ='${name}') as isExists`;
    const result = await dal.execute(sql);
    const isExists = result[0].isExists
    return isExists === 1

}

function fixDateFormat(date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${year}-${month}-${day}`;
}

export default {
    getAllVacations,
    getOneVacations,
    addVacation,
    updateFullVacation,
    updatePartialVacation,
    deleteVacation,
    followVacation,
    getFollowedVacations,
    deleteFollowedVacation,
    getAllFollowCount,
    getAllVacations1
};