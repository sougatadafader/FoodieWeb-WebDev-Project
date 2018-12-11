import React from 'react'
import UserService from "../../services/UserService";
import Header from "../Header/Header";
import FavoriteList from "../Favorites/FavoriteList";
import './Profile.style.css';
import pp from './img/avator.png'
import {Link} from "react-router-dom";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Moment from "react-moment";


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
        if(id===undefined){
            UserService.findUserInSession().then(
                user => this.setState({
                    user:user,
                    sameUser:true
                })
            )
        }
        else{
            console.log("not session",id)
            UserService.findUserById(id).then(
                user => this.setState({
                    user:user,
                    sameUser:this.props.user.id==id?true:false
                }))
        }
     }


    render(){
        return(
            <div>
                <Header/>
                <div className="profile-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                               <img src={pp} className="rounded"/>
                            </div>

                            {this.state.user!==null?
                            <div className="col-md-9 mt-1">
                                    <h1 className="title">{this.state.user.username}</h1>
                                    <p className="email">{this.state.user.email}</p>

                                   {this.state.user.aboutMe!==undefined?
                                    <span className="about-me">{this.state.user.aboutMe}</span>:""}<br/>
                                    <span className="member-since">
                                        Member since: <Moment format="YYYY/MM/DD">
                                                           {this.state.user.created}
                                                       </Moment>
                                    </span><br/>
                                   {this.state.sameUser?
                                    <p className="edit mt-2">
                                        <strong>
                                             <i className="fa fa-edit mr-1"></i>
                                             <Link to="/user/edit" className="edit">Update Your Profile</Link>
                                        </strong>
                                    </p>:""}
                                </div>
                                :""}
                        </div>
                    </div>
                </div>
                {this.state.user!==null?
                <FavoriteList userId={this.state.user.id}/>:""}
            </div>
        )
  }
}
