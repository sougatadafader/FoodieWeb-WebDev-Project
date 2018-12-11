import React from 'react'

const Admin = ({user, deleteUser, selectUser, selectedUser, editUser}) =>

    <tr className={(selectedUser===user) ? 'bg-primary text-light': ''} id={user.id} onClick={() => selectUser(user)}>
        {console.log(user)}
        <th scope="row" >{user.id}</th>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>
            <select disabled={user.userRole==='admin'}>
                <option value={user.userRole}>{user.userRole}</option>
                <option value={(user.userRole==='admin'? "user": "admin")}>{(user.userRole==='admin'? "user": "admin")}</option>
            </select>

            </td>
        <td>
        <button onClick={() => editUser(user)} className="btn fa fa-pencil " disabled={user.userRole==='admin'}>
        </button>
        <button onClick={() => deleteUser(user)} className="btn fa fa-trash  ml-2" disabled={user.userRole==='admin'}>
        </button>
        </td>
    </tr>


export default Admin


{/*import {Component} from "react";
import React from "react";

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedUser : this.props.selectedUser,
            selectedId:'',
            isSelected:false,
            isEdit:''
        }

    }
    selectRow=event =>{
        let id = event.target.value;
        this.setState({
            selectedUser: this.props.user,
            isSelected:true
        })
    }

    render() {
        return(
            <tr onClick={this.selectRow} className={this.state.isSelected ? ' bg-warning': ''} value={this.props.user.id}>
                <th scope="row" >{this.props.user.id}</th>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.password}</td>
                <td className="row">
                    {console.log(this.state.selectedId)}
                    <i className="btn fa fa-pencil mr-2"></i>
                    <i className="btn fa fa-times ml-2"></i>
                </td>
            </tr>

        )
    }
}*/}