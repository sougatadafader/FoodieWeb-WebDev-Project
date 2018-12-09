import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import './Register.style.css';
import UserService from "../../services/UserService";

class register extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            username:"",
            password:"",
            repeatPassword:"",
            sessionUser:null,
            redirect:false
        }
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    };

    handleRegistration = event => {
        event.preventDefault();
        let newUser = {
            username: this.state.username.trim(),
            password: this.state.password.trim()
        }

        if(newUser.username && newUser.password){
            UserService.registerUser(newUser).then(
                    user => this.setState({
                        sessionUser: user
                    },()=>{
                        this.setRedirect();
                    }))
        }
    };

    setRedirect=()=>{
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }
    }

    render() {
        return(
        <div className="row card-bg centerme rounded-mine shadow text-light">
            <div className="col-md-2"></div>
            <div className="col-md-8 top50 text-center">
            <h1 className="display-4">Register</h1>


            <form className="form-group form-inline top50">
                <label htmlFor="username" className="col-sm-10 offset-1 col-form-label">Username</label>
                <input className="form-control offset-1 mr-sm-2"
                       value={this.state.username}
                       name="username"
                       onChange={this.handleInputChange}
                       type="text"
                       placeholder="Username"
                       aria-label="Username">
                </input>
            </form>
            <form className="form-group form-inline">
                <label htmlFor="password" className="col-sm-10 offset-1 col-form-label">Password</label>
                <input className="form-control offset-1 mr-sm-2"
                       value={this.state.password}
                       name="password"
                       onChange={this.handleInputChange}
                       type="password"
                       placeholder="******"
                       aria-label="Password">
                </input>
            </form>
            <form className="form-group form-inline">
                <label htmlFor="verifyPassword" className="col-sm-10 offset-1 col-form-label">Verify Password</label>
                <input className="form-control offset-1 mr-sm-2"
                       value={this.state.repeatPassword}
                       name="repeatPassword"
                       onChange={this.handleInputChange}
                       type="password"
                       placeholder="******"
                       aria-label="VerifyPassword">
                </input>
            </form>
            <div className="">
                <button type="submit"
                        className="btn btn-warning btn-block "
                        onClick={this.handleRegistration}>Register
                </button>
                <div className="row">
                    <div className="col-12 bot30">
                        <Link to={"/"} className="nav-link float-left text-light">Cancel</Link>
                        <Link to={"/login"}
                              className="nav-link float-right text-light">Sign In</Link>
                    </div>
                </div>
            </div>
            {this.renderRedirect()}
            </div>
        </div>
        )}}
export default register;