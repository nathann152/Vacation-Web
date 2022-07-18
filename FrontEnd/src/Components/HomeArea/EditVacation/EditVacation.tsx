import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import vacationService from "../../../Services/VacationService";
import "./EditVacation.css";
import { TextField,Button } from "@mui/material";




function EditVacation(): JSX.Element {

    const params = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit,formState, setValue } = useForm<VacationModel>();
    const [vacation, setVacation] = useState<VacationModel>()


    useEffect(()=>{
        const id: number= +params.id
        vacationService.getOneVacation(id)
        .then(vacationToEdit =>{
            setVacation(vacationToEdit)
            setValue("destination",vacationToEdit.destination)
            setValue("description",vacationToEdit.description)
            setValue("fromDate",new Date(vacationToEdit.fromDate).toLocaleString().slice(0,9))
            setValue("untilDate", new Date(vacationToEdit.untilDate).toLocaleString().slice(0,9))
            setValue("price",vacationToEdit.price)
        })
        .catch(err=>console.log(err.message))

    })


    async function sent(vacations: VacationModel) {
        try {
            vacations.vacationId = vacation.vacationId
            const updatedVacation = await vacationService.updateVacation(vacations)
            alert("Vacation updated!")
            navigate("/admin");
        }
        catch (err: any) {
           alert(err.message)
         }
    }

    return (
        <div className="EditVacation Box">
            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(sent)}>

                    <label>Destination:</label><br/>
                 <TextField  variant="standard" {...register("destination",{
                    required: {value:true, message:"Missing destination"},
                    minLength: {value: 3 , message:"Name too short"},
                    maxLength: {value: 20 , message:"Name too long"}
                })}  /> 
                     <span>{formState.errors.destination?.message}</span>    
                     <br />
                <label>Description:</label><br/>
                <TextField variant="standard"{...register("description",{
                    required: {value:true, message:"Missing description"},
                    minLength: {value: 5 , message:"description too short"},
                    maxLength: {value: 300 , message:"description too long"}
                     })} /><br /><br />
                      <span>{formState.errors.description?.message}</span> 

                <label>FromDate:</label><br/>
                <TextField variant="standard" type=""{...register("fromDate",{
                    required: {value:true, message:"Missing fromDate"},
                     })} /><br /><br />
                      <span>{formState.errors.fromDate?.message}</span> 

                <label>UntilDate:</label><br/>
                <TextField variant="standard"type=""{...register("untilDate",{
                    required: {value:true, message:"Missing untilDate"} 
                     })} /><br /><br />
                      <span>{formState.errors.untilDate?.message}</span> 

                <label>Price:</label><br/>
                <TextField variant="standard" type="number"{...register("price",{
                    required: {value:true, message:"Missing price"},
                    min: {value: 0 , message:"Price can't be negative"},
                    max: {value: 100000 , message:"Price too high"}
                     })} />
                      <span>{formState.errors.price?.message}</span> <br /><br />

                <label>Image:</label><br /><br />
                <input type="file" accept="image/*" required {...register("image")}/>

                 <button>Updated</button>

            </form>

        </div>
    );
}

export default EditVacation;
