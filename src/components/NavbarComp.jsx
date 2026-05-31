import { Link } from "react-router-dom";

export default function NavbarComp() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <span className="logo-dot"></span>
                Dictionary
            </Link>
            <span className="navbar-badge">EN</span>
        </nav>
    );
}