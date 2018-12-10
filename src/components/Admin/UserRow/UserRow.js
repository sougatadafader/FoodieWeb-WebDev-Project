import {Component} from "react";
import React from "react";

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedId:''
        }

    }

    render() {
        return(
            <tr >
                <th scope="row" onClick={this.state.selectedId = this.props.key}>{this.props.user.id}</th>
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
}