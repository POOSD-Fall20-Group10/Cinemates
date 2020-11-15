import { Link } from 'react-router-dom';
import Register from './Register';

function RegisterHeader() {
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={"/"}>Login</Link>
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
        <Register></Register>
        </div>

    );
}

export default RegisterHeader;