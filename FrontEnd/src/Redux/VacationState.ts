
import VacationModel from "../Models/vacationModel";



export class VacationState {
    public vacations: VacationModel[] = []

}
export enum vacationsActionTypes {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    FollowVacation = "FollowVacation",
    UnFollow = "UnFollow"
}


export interface VacationAction {
    type: vacationsActionTypes;
    payload: any;
}

export function FollowAction(vacationId: number): VacationAction {
    const action: VacationAction = { type: vacationsActionTypes.FollowVacation, payload: vacationId }
    return action
}

export function unFollowAction(vacationId: number): VacationAction {
    const action: VacationAction = { type: vacationsActionTypes.UnFollow, payload: vacationId }
    return action
}


export function fetchVacationAction(vacations: VacationModel[]): VacationAction {
    const action: VacationAction = { type: vacationsActionTypes.FetchVacations, payload: vacations }
    return action

}

export function addVacationAction(vacation: VacationModel): VacationAction {
    const action: VacationAction = { type: vacationsActionTypes.AddVacation, payload: vacation }
    return action

}

export function updateVacationAction(vacation: VacationModel): VacationAction {
    const action: VacationAction = { type: vacationsActionTypes.UpdateVacation, payload: vacation }
    return action

}
export function deleteVacationAction(id: number): VacationAction {
    const action: VacationAction = { type: vacationsActionTypes.DeleteVacation, payload: id }
    return action
}


export function vacationsReducer(currentState: VacationState = new VacationState(), action: VacationAction) {
    const newState = { ...currentState }

    switch (action.type) {

        case vacationsActionTypes.FollowVacation:
            const isFollowingToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if ( newState.vacations[isFollowingToUpdate].isFollowing === 0) {
                newState.vacations[isFollowingToUpdate].isFollowing = 1;
                newState.vacations[isFollowingToUpdate].followersCount +=1
            }
            break;

        case vacationsActionTypes.UnFollow:
            const isNotFollowingToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (newState.vacations[isNotFollowingToUpdate].isFollowing === 1) {
                newState.vacations[isNotFollowingToUpdate].isFollowing = 0
                newState.vacations[isNotFollowingToUpdate].followersCount -=1
            }
            break;

        case vacationsActionTypes.FetchVacations:
            newState.vacations = action.payload;
            break;

        case vacationsActionTypes.AddVacation:
            newState.vacations.push(action.payload)
            break;

        case vacationsActionTypes.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id)
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload
            }
            break;

        case vacationsActionTypes.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1)
            }
            break;
    }


    return newState
}
