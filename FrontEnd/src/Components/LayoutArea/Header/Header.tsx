import "./Header.css";
import airplane from "../../../assets/images/airplane1.gif"
import AuthMenu from "../../LoginArea/AuthMenu/AuthMenu";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
			<h1>Time to travel! <img className="image" src={airplane} alt="airplane"/> </h1>
        </div>
    );
}

export default Header;
