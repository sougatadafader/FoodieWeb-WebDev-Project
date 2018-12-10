import React, {Component} from 'react'
import Header from "../Header/Header";
import UserService from "../../services/UserService";
import UserRow from "./UserRow/UserRow"

export default class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            selectedUser:{}
        }
    }
    componentDidMount=()=>
    {
        UserService.findAllUsers().then(
            users => this.setState({
                users: users
            })
        )}

    selectUser = user => {
        this.setState({
            selectedUser: user,
        })
    }


    render() {
        return (
            <div className="container-fluid ml-0 mr-0 pl-0 pr-0">
                <Header/>
            <table className="table">

                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th><label></label></th>
                    <td><input type="text" className="col-sm-5" id="fldUsername"/></td>
                    <td><input type="text" className="col-sm-5" id="fldEmail"/></td>
                    <td><input type="text" className="col-sm-5" id="fldPassword"/></td>
                    <td><input type="text" className="col-sm-5" id="fldPassword"/></td>
                    <td><button className=" btn btn-md btn-primary pl-lg-1 mb-1" id="addUpdateBtn">Add</button></td>
                </tr>
                {this.state.users.length!==0?
                    this.state.users.map((user,index)=>

                        (<UserRow user={user} key={index} selectedUser={this.state.selectedUser} selectUser={this.selectUser}/>) ): "" }
                </tbody>
            </table>
            </div>
        )
    }
}