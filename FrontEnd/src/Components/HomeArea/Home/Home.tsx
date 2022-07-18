import VacationList from "../VacationList/VacationList";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<VacationList />
        </div>
    );
}

export default Home;
