import { style } from "@mui/system";
import { url } from "inspector";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import vacationModel from "../../../Models/vacationModel";
import store from "../../../Redux/Store";
import vacationService from "../../../Services/VacationService";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";
import "./AdminPage.css";
import image from "../../../assets/images/sunset-1373171__480.jpg"

function AdminPage(): JSX.Element {
    const [vacation, setVacation] = useState<vacationModel[]>([]);
    useEffect(() => {

        vacationService.getAllVacation()
            .then(vacation => setVacation(vacation))
            .catch(err => alert(err.message))

     const unsubscribe = store.subscribe(()=>{
        // console.log(store.getState().vacationState.vacations);
        const dup = [...store.getState().vacationState.vacations]
        setVacation(dup)

     });  

    }, []);

    return (
        <div className="AdminPage">
            <NavLink to="/vacation/new">➕ Add Vacation</NavLink> <br />
            <NavLink to= "/vacation-chart">Chart</NavLink>
            {vacation.map(v => <VacationCardAdmin key={v.vacationId} vacation={v} />)}


        </div>
    );
}

export default AdminPage;
