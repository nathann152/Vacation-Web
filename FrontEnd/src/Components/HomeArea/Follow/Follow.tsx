import { useState } from "react";
import followService from "../../../Services/FollowService";
import vacationService from "../../../Services/VacationService";
import "./Follow.css";

function Follow(): JSX.Element {

    const [following, setFollowing] = useState<Boolean>(false);

    function isFollowing() {
        following === false ? setFollowing(true) : setFollowing(false);
    }

    return (
        <div className="FollowButton">
        {following ? <button className="btn btn-outline-secondary" onClick={isFollowing}>Following</button> : <button className="btn btn-outline-primary" onClick={isFollowing}>Follow</button>}
        </div>
    );
}

export default Follow;
