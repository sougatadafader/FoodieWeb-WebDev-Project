import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import UserService from "../../services/UserService";
import Header from "../Header/Header";

export default class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userId:null,
            username:"",
            password:"",
            email:"",
            sessionUser:null,
            redirect:false,
            user:null,
            sameUser:"false"
        }
    }

    componentDidMount(){

            UserService.findUserInSession().then(
                user => this.setState({
                    userId: user.id,
                    username: user.username,
                    password: user.password,
                    email: user.email
                })
           ).then(
               json=> this.sameUserCheck())}

    sameUserCheck=()=>{
        if(this.state.userId == this.props.match.params.userId
            || this.props.match.params.userId===undefined){
            this.setState({
                sameUser:"true"
            })
        }
        else{
            UserService.findUserById(this.props.match.params.userId).then(
                user => this.setState({
                    user:user,
                    sameUser:"false"
                }))
        }
    }
    render(){
        return(
            <div>
                <Header className="ml-0 mr-0 pl-0 pr-0"/>
                <h1>Profile {this.state.sameUser}</h1>
            </div>
        )
  }
}