import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import UserService from "../../services/UserService";
import Header from "../Header/Header";
import pp from './img/avator.png'


class profile extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userId:null,
            username:"",
            password:"",
            aboutMe:"",
            email:"",
            sessionUser:null,
            redirect:false
        }
    }
    componentDidMount(){
        UserService.findUserInSession().then(
            user => this.setState({
                sessionUser:user,
                userId: user.id,
                username: user.username,
                password: user.password,
                email:user.email,
                aboutMe:user.aboutMe
            }))
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    };

    handleUpdate = () => {
        var loginUser = {
            username: this.state.username.trim(),
            password: this.state.password.trim(),
            aboutMe:this.state.aboutMe
        }

        if(loginUser.username && loginUser.password){
            UserService.updateUser(this.state.userId,loginUser).then(
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
            return <Redirect to={'/profile'} />
        }
    }

    render() {
        return(
            <div>
                <Header/>
                <div className="container custom-container">
                   <div className="profile-edit-container mt-4 p-5">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <img src={pp} className="img-thumbnail custom-pp" alt="brand"/>
                            </div>
                            <div className="col-md-12 mt-2 text-center">
                                <h3>Update Profile Information</h3>
                            </div>
                        </div>
                        <form className="login-form">
                            <div className="form-group row">
                                <label htmlFor="username"
                                       className="col-sm-2 col-form-label">
                                    <i className="fa fa-user"></i> {" "}
                                    <strong>Username</strong>
                                </label>
                                <div className="col-sm-10">
                                    <input className="form-control"
                                           id="username"
                                           placeholder="Alice"
                                           value={this.state.username}
                                           onChange={this.handleInputChange}
                                           name="username"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="password"
                                       className="col-sm-2 col-form-label">
                                    <i className="fa fa-key"></i> {" "}
                                    <strong>Password</strong>
                                </label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           id="password"
                                           placeholder="123qwe#$%"
                                           value={this.state.password}
                                           onChange={this.handleInputChange}
                                           name="password"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email"
                                       className="col-sm-2 col-form-label">
                                    <i className="fa fa-at"></i> {" "}
                                    <strong>Email</strong>
                                </label>
                                <div className="col-sm-10">
                                    <input type="email"
                                           className="form-control"
                                           id="email"
                                           placeholder="example@example.com"
                                           value={this.state.email}
                                           onChange={this.handleInputChange}
                                           name="email" disabled/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email"
                                       className="col-sm-2 col-form-label">
                                    <i className="fa fa-comments"></i>{" "}
                                   <strong>About Me</strong>
                                </label>
                                <div className="col-sm-10">
                                    <textarea type="text"
                                           className="form-control"
                                           id="aboutMe"
                                           placeholder="Tell something about yourself....."
                                           value={this.state.aboutMe}
                                           onChange={this.handleInputChange}
                                           name="aboutMe"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-10">
                                    <div className="row mb-3">
                                        <div className="col-8">
                                            <a className="btn btn-success btn-block text-white"
                                               onClick={this.handleUpdate}>Update</a>
                                        </div>
                                        <div className="col-4">
                                            <Link to="/profile"
                                                  className="btn btn-danger btn-block">
                                                Cancel
                                            </Link>
                                        </div>
                                    </div>{this.renderRedirect()}
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
        )
    }
}
export default profile;