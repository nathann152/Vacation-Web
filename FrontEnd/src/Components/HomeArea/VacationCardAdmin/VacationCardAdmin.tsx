import VacationModel from "../../../Models/vacationModel";
import config from "../../../Utils/Config";
import "./VacationCardAdmin.css";
import { NavLink, useNavigate } from "react-router-dom";
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';
import vacationService from "../../../Services/VacationService";


interface VacationCardProps {
    vacation: VacationModel
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function VacationCardAdmin(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();


    async function deleteVacation() {
        try {
            vacationService.deleteVacation(props.vacation.vacationId)
            navigate("/admin/");
            alert("vacation as been delete")
        }
        catch (err: any) {
            alert(err.message)
        }

    }


    return (
        <div className="VacationCard Box">

            <div>
                <h3> {props.vacation.destination} </h3> <br />
                {props.vacation.description}<br />
                Price: {props.vacation.price}$ <br />
                From: {new Date(props.vacation.fromDate).toLocaleString().slice(0, 9)}<br />
                Until: {new Date(props.vacation.untilDate).toLocaleString().slice(0, 9)}
            </div>

            <div>
                <img src={config.vacationImageUrl + props.vacation.imageName} /> <br />
                {/* <NavLink to={"/vacations/details/" + props.vacation.vacationId}>Click to delete/update</NavLink>    */}
            </div>
            <div>
                <NavLink  className="holdsLinks" to={"/vacations/edit/" + props.vacation.vacationId}><Grid container sx={{ fontSize: 60 }}><Grid item xs={18}><BuildTwoToneIcon htmlColor="black" fontSize="large" /></Grid></Grid></NavLink>
                <NavLink  className="holdsLink" to="/admin" onClick={deleteVacation}><Grid container sx={{ fontSize: 60 }}><Grid item xs={18}><DeleteIcon htmlColor="black" fontSize="large" /></Grid></Grid> </NavLink>
            </div>
        </div>
    );
}

export default VacationCardAdmin;
