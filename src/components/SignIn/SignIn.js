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
            redirect:false,
            invalid:false
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
                })).then(()=>this.setRedirect())
    }};


    setRedirect=()=>{
        console.log(this.state.sessionUser)
        if(Object.keys(this.state.sessionUser).length === 0){
            this.setState({
                invalid:true
            })
        }
        else{
            this.setState({
                redirect: true
            })
        }

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
                <h1 className="display-4">Sign In</h1>
                <span className="invalid">{this.state.invalid?"Invalid username and password":""}</span>
                <form className="form-group form-inline top50 ">
                    <label htmlFor="username" className="col-sm-10 offset-1 col-form-label">Username</label>
                    <input className="form-control offset-1 mr-sm-2"
                           type="text"
                           placeholder="Username"
                           aria-label="Username"
                           value={this.state.username}
                           name="username"
                           onChange={this.handleInputChange}>
                    </input>
                </form>
                <form className="form-group form-inline">
                    <label htmlFor="password" className="col-sm-10 offset-1 col-form-label">Password</label>
                    <input className="form-control offset-1 mr-sm-2"
                           type="password"
                           placeholder="******"
                           aria-label="Password"
                           value={this.state.password}
                           name="password"
                           onChange={this.handleInputChange}>
                    </input>
                </form>
                <div className="">
                    <button type="submit"
                            className="btn btn-warning btn-block "
                            onClick={this.handleLogin}>Sign In
                    </button>
                    <div className="row mt-2 bot30">
                        <div className="col-12">
                            <Link to={"/"} className="nav-link float-left text-light">Cancel</Link>
                            <Link to={"/register"} className="nav-link float-right text-light">Register</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
                </div>
                <div className="col-md-2"></div>
            </div>
        )
    }
}
export default signin;