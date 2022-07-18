import axios from "axios";
import store from "../Redux/Store";
import { FollowAction, unFollowAction } from "../Redux/VacationState";
import config from "../Utils/Config";

class FollowersService {


    public async follow(vacationId: number): Promise<void> {
        await axios.post(config.followVacationUrl + vacationId);
        store.dispatch(FollowAction(vacationId))
    }

    public async unFollow(vacationId: number): Promise<void> {
        await axios.delete(config.followVacationUrl + vacationId);
        store.dispatch(unFollowAction(vacationId))
    }

}
const followersService = new FollowersService();
export default followersService;
