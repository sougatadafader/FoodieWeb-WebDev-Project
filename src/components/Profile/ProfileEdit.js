import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import UserService from "../../services/UserService";
import Header from "../Header/Header";

/**
 * To do: List all favorite recipes with option to remove from fav
 * Visit other people's profile with no edit option
 */
class profile extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userId:null,
            username:"",
            password:"",
            aboutMe:"",
            sessionUser:null,
            redirect:false
        }
    }
    componentDidMount(){


        UserService.findUserInSession().then(
            user => this.setState({
                userId: user.id,
                username: user.username,
                password: user.password,
                aboutMe:user.aboutMe
            })
        )
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
                <div className="row card-bg centerme rounded-mine shadow text-light">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 top50 text-center">
                        <h1 className="display-4">Update</h1>

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
                                   type="text"
                                   placeholder="******"
                                   aria-label="Password"
                                   value={this.state.password}
                                   name="password"
                                   onChange={this.handleInputChange}>
                            </input>
                        </form>
                        <form className="form-group form-inline">
                            <label htmlFor="password" className="col-sm-10 offset-1 col-form-label">About Yourself</label>
                            <textarea className="form-control offset-1 mr-sm-2"
                                   type="text"
                                   placeholder="Tell about yourself"
                                   aria-label="About me"
                                   value={this.state.aboutMe}
                                   name="aboutMe"
                                   onChange={this.handleInputChange}>
                            </textarea>
                        </form>
                        <div className="">
                            <button type="submit"
                                    className="btn btn-warning btn-block "
                                    onClick={this.handleUpdate}>Update
                            </button>
                            <div className="mt-2 bot30">
                                <Link to={"/profile"} className="btn btn-danger btn-block  nav-link float-left text-light bot30">Cancel</Link>
                            </div>
                        </div>
                        {this.renderRedirect()}
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        )
    }
}
export default profile;