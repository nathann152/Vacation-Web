
import { Navigate, Route, Routes } from "react-router-dom";
import AddVacation from "../../HomeArea/AddVacation/AddVacation";
import AdminChart from "../../HomeArea/AdminChart/AdminChart";
import AdminPage from "../../HomeArea/AdminPage/AdminPage";
import EditVacation from "../../HomeArea/EditVacation/EditVacation";
import Home from "../../HomeArea/Home/Home";
import VacationDetails from "../../HomeArea/VacationDetails/VacationDetails";

import Login from "../../LoginArea/Login/Login";
import Logout from "../../LoginArea/Logout/Logout";
import Register from "../../LoginArea/Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			
            <Routes>
                <Route path="/register" element={<Register />} />

                <Route path="/admin" element={<AdminPage />} />

                <Route path="/login" element={<Login />} />

                <Route path="/logout" element={<Logout />} />

                <Route path="/home" element={<Home/>}/>

                <Route path="/login" element={<Login/>}/>

                <Route path="/vacation/new" element={<AddVacation />}/>

                <Route path="" element={<Navigate to="/home"/>}/>

                <Route path="/vacations/details/:id" element={<VacationDetails />} />

                <Route path="/vacations/edit/:id" element={<EditVacation />} />
                
                <Route path="/vacation-chart" element={<AdminChart />} />


                <Route  path="*" element={<PageNotFound/>}/>



            </Routes>

        </div>
    );
}

export default Routing;
