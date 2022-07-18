import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/VacationService";
import config from "../../../Utils/Config";
import "./VacationDetails.css";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';

function VacationDetails(): JSX.Element {

    // React Hook for getting the route parameter values in the current route:
    const params = useParams();

    const navigate = useNavigate();

    const [  vacation, setVacation] = useState<VacationModel>();

    useEffect(() => {

        // Take the value:
        const id: number = +params.id; // prodId is the name of the route parameter.

        vacationService.getOneVacation(id)
            .then(vacation => setVacation(vacation))
            .catch(err => alert(err.message));

    }, []);
 

    async function deleteVacation(){
        try{
          vacationService.deleteVacation(vacation.vacationId)
          navigate("/admin/");
          alert("vacation as been delete")
        }
        catch(err:any){
            alert(err.message)
        }

    }
    
    return (
        <div className="VacationDetails Box">

            <h2>Vacation Details</h2>
            {
                vacation && <>
                    <h3>{vacation.destination}</h3>
                    <p>Description: {vacation.description}</p>
                    <p>Price: ${vacation.price}</p>
                    FromDate: {new Date(vacation.fromDate).toLocaleString().slice(0,9)} <br />
                    UntilDate: {new Date(vacation.untilDate).toLocaleString().slice(0,9)}<br />
                    <img src={config.vacationImageUrl + vacation.imageName} />
                    <br /><br />

                    <NavLink to="/admin">Back to List</NavLink>
                    <span> | </span>

                    <NavLink to={"/vacations/edit/" + vacation.vacationId}><Grid container sx={{fontSize: 60}}><Grid item xs={18}><BuildTwoToneIcon fontSize="large"/></Grid></Grid></NavLink>
                    <span></span> <br /> <br /><br />

                    <NavLink  to="/admin"onClick={deleteVacation}><Grid container sx={{fontSize: 60}}><Grid item xs={18}><DeleteIcon fontSize="large"/></Grid></Grid>
                    </NavLink>
                </>
            }

        </div>
    );
}

export default VacationDetails;
