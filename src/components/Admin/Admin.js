import React, {Component} from 'react'
import Header from "../Header/Header";
import UserService from "../../services/UserService";
import UserRow from "./UserRow/UserRow"

export default class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }
    componentDidMount=()=>
    {
        UserService.findAllUsers().then(
            users => this.setState({
                users: users
            })
        )}

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
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>

                {this.state.users.length!==0?
                    this.state.users.map((user,index)=>

                        (<UserRow user={user} key={index}/>) ): "" }
                </tbody>
            </table>
            </div>
        )
    }
}