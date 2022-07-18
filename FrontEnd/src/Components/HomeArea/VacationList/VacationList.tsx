import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import vacationModel from "../../../Models/vacationModel";
import store from "../../../Redux/Store";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";


function VacationList(): JSX.Element {

    const navigate = useNavigate()

    const [vacation, setVacation] = useState<vacationModel[]>([]);
    useEffect(() => {

        checkIfLoggedIn()
        vacationService.getAllVacation()
            .then(vacation => setVacation(vacation))
            .catch(err => console.log(err.message))

     const unsubscribe = store.subscribe(()=>{
        const dup = [...store.getState().vacationState.vacations]
        setVacation(dup)
     });  
     return unsubscribe
    }, []);
    
        function checkIfLoggedIn() {   
         if (!store.getState().authState.user) {
            navigate("/login")
            }
        }
    return (
        <div className="VacationList">
            {vacation.map(v => <VacationCard key={v.vacationId} vacation={v} /> )}
        </div>
    );
}

export default VacationList;
