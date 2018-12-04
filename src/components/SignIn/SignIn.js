import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import './Signin.style.css';
import UserService from "../../services/UserService";

class signin extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            username:"",
            password:"",
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

    handleLogin = () => {
        var loginUser = {
            username: this.state.username.trim(),
            password: this.state.password.trim()
        }

        if(loginUser.username && loginUser.password){
            UserService.login(loginUser).then(
                user => this.setState({
                    sessionUser: user
                },()=>{
                    this.setRedirect();
                }))}
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
            <div className="container signin-container">
                <h1>Sign In for FoodieWeb</h1>

                <form className="form-group form-inline">
                    <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                    <input className="form-control mr-sm-2"
                           type="text"
                           placeholder="Username"
                           aria-label="Username"
                           value={this.state.username}
                           name="username"
                           onChange={this.handleInputChange}>
                    </input>
                </form>
                <form className="form-group form-inline">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <input className="form-control mr-sm-2"
                           type="password"
                           placeholder="******"
                           aria-label="Password"
                           value={this.state.password}
                           name="password"
                           onChange={this.handleInputChange}>
                    </input>
                </form>
                <div className="col-sm-5">
                    <button type="submit"
                            className="btn btn-primary btn-block"
                            onClick={this.handleLogin}>Sign In
                    </button>
                    <div className="row">
                        <div className="col-12">
                            <Link to={"/"} className="float-left">Cancel</Link>
                            <Link to={"/register"} className="nav-link float-right">Register</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        )
    }
}
export default signin;