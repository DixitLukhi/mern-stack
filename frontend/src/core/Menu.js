import React from "react";
import { Link } from "react-router-dom";

const currentTab = (path) => {
    
    if (window.location.pathname === path) {
        return { color: "#2ecc72" }
    } else {
        return { color: "#FFFFFF" }
    }
}
const Menu = () => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab("/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab("/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab("/user/dashboard")} className="nav-link" to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab("/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                    A. Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab("/signup")} className="nav-link" to="/signup">
                    Signup
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab("/signin")} className="nav-link" to="/signin">
                    Sign In
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab("/signout")} className="nav-link" to="/signout">
                    Signout
                </Link>
            </li>
        </ul>
    </div>
);

export default Menu;
