import React from 'react'
import {Link} from 'react-router-dom'

const Header = () =>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className="navbar-brand" href="#">FoodieWeb</Link>

        <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/"} className="nav-link register" href="#" id="register">Register</Link>
                </li>
            </ul>
        </div>
    </nav>

export default Header;