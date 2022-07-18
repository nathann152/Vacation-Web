import VacationModel from "../../../Models/vacationModel";
import followService from "../../../Services/FollowService";
import config from "../../../Utils/Config";
import "./VacationCard.css";
import Button from '@mui/material/Button';




interface VacationCardProps {
    vacation: VacationModel
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function VacationCard(props: VacationCardProps): JSX.Element {


    function isFollowing(isFollowing: number): Boolean {
        return isFollowing === 1 ? true : false;

    }

    return (
        <div className="VacationCard Box">
            <div>
                {!isFollowing(props.vacation.isFollowing) ? <Button  onClick={() => followService.follow(props.vacation.vacationId)} style={{}}>🤍 Follow</Button> :  <Button variant="contained" onClick={() => followService.unFollow(props.vacation.vacationId)}>💜 Following</Button>}
                {/* &nbsp; */}
                <h3> {props.vacation.destination} </h3> <br />
                {props.vacation.description}<br />
                Price: {props.vacation.price}$ <br />
                From: {new Date(props.vacation.fromDate).toLocaleString().slice(0, 10)}<br />
                Until: {new Date(props.vacation.untilDate).toLocaleString().slice(0, 9)}
            </div>
            <div>
                <img src={config.vacationImageUrl + props.vacation.imageName} /> <br /> <br />
                <div className="Box2">
                    Followers Count: {props.vacation.followersCount}
                </div>
            </div>
        </div>
    );
}

export default VacationCard

