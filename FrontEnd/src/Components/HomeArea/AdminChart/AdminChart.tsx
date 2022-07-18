import "./AdminChart.css";
import vacationService from "../../../Services/VacationService";
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import vacationModel from "../../../Models/vacationModel";
import { } from "chart.js/auto";
import { PropaneSharp } from "@mui/icons-material";


function AdminChart(): JSX.Element {

    const getAllVacations= async () => {
        const vacations = await vacationService.getAllVacation();
       return  vacations
    }
    
    const [vacation, setVacations] = useState<vacationModel[]>([]);
    useEffect(() => {
        getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => console.log(err.message))
    
    }  , [])

 
        const [data ,setData ] = useState<any>({
            labels: vacation.map(vacation => vacation.destination),
            datasets: [{
                label: 'Followers Count',
                data: vacation.map((vacation) => vacation.followersCount),
            }] as any

        })
    return (
        <div className="chartContainer">
            <h1>{vacation.map( (f)  => f.destination +"|" +f.followersCount +"|"  )} </h1>
        <Bar
            data={data}
            options={{
                responsive: true,
                maintainAspectRatio: true,
                layout: {
                    padding: {
                        top: 50,
                        left: 100,
                        right: 100,
                        bottom: 0,
                    },
                },
            }}
        />
    </div>
    );
}

export default AdminChart;
