import { NavLink } from "react-router-dom";

let Header = () =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li> */}
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/calculator">Calculator</NavLink>
                    </li>
                    {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/ofc">CalcuLator</NavLink>
                    </li> */}
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/teacher">Teacher</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/teacher/add">Add Teacher</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">User Login</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/game1">Game1</NavLink>
                    </li>
                    {
                        localStorage.getItem('access-token') ? <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </li>
                        </> : ''
                    }
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;