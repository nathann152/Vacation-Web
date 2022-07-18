import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/VacationService";
import "./AddVacation.css";
import { TextField,Button } from "@mui/material";
import * as React from 'react';

function AddVacation(): JSX.Element {

    const navigate = useNavigate()

    const { register, handleSubmit,formState } = useForm<VacationModel>();

    async function sent(vacation: VacationModel) {
        try {
            const addedVacation = await vacationService.addVacation(vacation)
            alert("Vacation added!")
            navigate("/admin");
        }
        catch (err: any) {
           alert(err.message)
         }
    }


    return (
        <div className="AddVacation Box">
            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(sent)}>

            <label>Destination:</label><br/>
                 <TextField  className="TextBox" variant="standard" {...register("destination",{
                    required: {value:true, message:"Missing destination"},
                    minLength: {value: 3 , message:"Name too short"},
                    maxLength: {value: 20 , message:"Name too long"}
                })}  /> 
                     <span>{formState.errors.destination?.message}</span>    
                     <br />
                <label>Description:</label><br/>
                <TextField className="TextBox" variant="standard"{...register("description",{
                    required: {value:true, message:"Missing description"},
                    minLength: {value: 5 , message:"description too short"},
                    maxLength: {value: 300 , message:"description too long"}
                     })} /><br /><br />
                      <span>{formState.errors.description?.message}</span> 

                <label>FromDate:</label><br/>
                <TextField className="TextBox" variant="standard" type="date"{...register("fromDate",{
                    required: {value:true, message:"Missing fromDate"},
                     })} /><br /><br />
                      <span>{formState.errors.fromDate?.message}</span> 

                <label>UntilDate:</label><br/>
                <TextField className="TextBox" variant="standard" type="date"{...register("untilDate",{
                    required: {value:true, message:"Missing untilDate"} 
                     })} /><br /><br />
                      <span>{formState.errors.untilDate?.message}</span> 

                <label>Price:</label><br />
                <TextField className="TextBox" variant="standard" type="number"{...register("price",{
                    required: {value:true, message:"Missing price"},
                    min: {value: 0 , message:"Price can't be negative"},
                    max: {value: 100000 , message:"Price too high"}
                     })} /><br />
                      <span>{formState.errors.price?.message}</span> <br /><br />

                <label>Image:</label><br /><br />
                <input type="file" accept="image/*" {...register("image")}/>

              <Button variant="contained" type="submit" color="secondary">Add</Button>

            </form>

        </div>
    );
}

export default AddVacation;
