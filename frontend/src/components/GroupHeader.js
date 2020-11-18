import { Link } from 'react-router-dom';

function GroupHeader() {
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={"/"}>Cinemates</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/"}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Sign-up</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </div>
    );
}

export default GroupHeader;