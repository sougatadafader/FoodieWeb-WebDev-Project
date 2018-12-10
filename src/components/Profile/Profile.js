import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import UserService from "../../services/UserService";
import Header from "../Header/Header";
import Favorite from "../Favorites/Favorite";
export default class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            email:"",
            redirect:false,
            user:null,
            sameUser:false
        }
    }

    componentDidMount(){
        this.loadSessionUser(this.props.match.params.userId)
    }

   componentWillReceiveProps(nextProps){
        this.loadSessionUser(nextProps.match.params.userId);
   }

   loadSessionUser(id){
       UserService.findUserInSession().then(
           user => this.setState({
               user:user,
               username: user.username,
               password: user.password,
               email: user.email,
           })
       ).then(
           json=> this.sameUserCheck(id))
   }
    sameUserCheck=(id)=>{
        if(this.state.user.id == id
            || id===undefined){
            this.setState({
                sameUser:true
            })
        }
        else{
            UserService.findUserById(id).then(
                user => this.setState({
                    user:user,
                    sameUser:false
                }))
        }
    }

    render(){
        console.log(this.state.user)
        return(
            <div>
                <Header className="ml-0 mr-0 pl-0 pr-0"/>
                <div className="container">
                    {this.state.user?
                      <div>
                          {this.state.user.username}
                          {this.state.user.email}
                          {this.state.user.password}
                          {this.state.sameUser?<i className="fa fa-edit"></i>:""}
                      </div>


                        :""


                    }
                </div>
                <div>
                    {this.state.user !== null?
                       <Favorite sameUser={this.state.sameUser} userId={this.state.user.id}/>:""
                    }
                </div>
            </div>
        )
  }
}