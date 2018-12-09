import React, {Component} from 'react'
import Header from "../Header/Header";
import UserService from "../../services/UserService";
import ResultCard from "../ResultCard/ResultCard";
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

                        (

                            <tr key={index}>
                    <th scope="row">{user.id}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                                <td className="row">
                                    <i className="btn fa fa-pencil mr-2"></i>
                                    <i className="btn fa fa-times ml-2"></i>
                                </td>
                </tr>) ): "" }
                </tbody>
            </table>
            </div>
        )
    }
}