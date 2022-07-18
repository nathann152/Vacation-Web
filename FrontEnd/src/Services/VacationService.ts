import axios from "axios"
import vacationModel from "../Models/vacationModel"
import store from "../Redux/Store"
import { addVacationAction, deleteVacationAction, fetchVacationAction, updateVacationAction } from "../Redux/VacationState"
import config from "../Utils/Config"

class VacationService {


    // Get all vacation
    public async getAllVacation(): Promise<vacationModel[]> {
        let vacations = store.getState().vacationState.vacations;
        if (vacations.length === 0) {
            const response = await axios.get<vacationModel[]>(config.vacationUrl)
            vacations = response.data
            store.dispatch(fetchVacationAction(vacations))
        }
        return vacations

    }
   

    // get one vacation 
    public async getOneVacation(vacationId: number): Promise<vacationModel> {
        const response = await axios.get<vacationModel>(config.vacationUrl + vacationId)
        const vacations = await this.getAllVacation()
        const vacation = vacations.find(v => v.vacationId === vacationId)
        return vacation
    }

    // Add Vacation
    public async addVacation(vacation: vacationModel): Promise<vacationModel> {

        const formDate = new FormData()
        formDate.append("destination", vacation.destination)
        formDate.append("description", vacation.description)
        formDate.append("fromDate", vacation.fromDate)
        formDate.append("untilDate", vacation.untilDate)
        formDate.append("price", vacation.price.toString());
        formDate.append("image", vacation.image.item(0));
        const response = await axios.post<vacationModel>(config.vacationUrl, formDate)
        const addedVacation = response.data
        store.dispatch(addVacationAction(addedVacation));
        return addedVacation
    }

    // update vacation
    public async updateVacation(vacation: vacationModel): Promise<vacationModel> {

        const formDate = new FormData()
        formDate.append("destination", vacation.destination)
        formDate.append("description", vacation.description)
        formDate.append("fromDate", vacation.fromDate)
        formDate.append("untilDate", vacation.untilDate)
        formDate.append("price", vacation.price.toString());
        formDate.append("image", vacation.image.item(0));

        const response = await axios.put<vacationModel>(config.vacationUrl + vacation.vacationId, formDate)

        const updatedVacation = response.data
        store.dispatch(updateVacationAction(updatedVacation)); 
        return updatedVacation

    }

    // delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(config.vacationUrl + vacationId)
        store.dispatch(deleteVacationAction(vacationId))
    }



}

const vacationService = new VacationService()

export default vacationService