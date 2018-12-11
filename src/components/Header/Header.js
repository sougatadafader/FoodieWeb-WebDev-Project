import React from 'react'
import {Link} from 'react-router-dom'
import UserService from "../../services/UserService";

class Header extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            sessionUser:{}
        }
    }

    componentDidMount=()=>
    {
        UserService.findUserInSession().then(
            user => this.setState({
                sessionUser: user
            },()=>{
                //console.log("session",this.state.sessionUser)
            })
        )}

    handleLogout=()=>
        UserService.logout().then(()=>{
            this.setState({
                sessionUser:{}
            },()=>{
                window.location.reload()
            })
        })



    render(){
        let username = this.state.sessionUser.username;
        let role = this.state.sessionUser.userRole;
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={"/"} className=" navbar-brand" href="#">FoodieWeb</Link>

                {(role ==='admin') ?
                < Link to={"/admin"} className="nav-link bg-secondary rounded text-light p-1" href="#">Admin Panel</Link>
                :<div></div>}
                <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {username?
                            <Link to={"/profile"} className="nav-link">
                                {username.charAt(0).toUpperCase()+ username.slice(1)}
                            </Link>:
                            <Link to={"/login"} className="nav-link">
                                Sign In
                            </Link>}
                        </li>
                        <li className="nav-item">
                            {username?
                            <Link to={"/"} className="nav-link register"
                                  onClick={this.handleLogout}
                                  id="register">
                                Logout
                            </Link>:
                            <Link to={"/register"} className="nav-link register" id="register">
                                Register
                            </Link>}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;