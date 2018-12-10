import React, {Component} from 'react'
import Header from "../Header/Header";
import UserService from "../../services/UserService";
import UserRow from "./UserRow/UserRow"
import AdminService from "../../services/AdminService";

export default class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            username:"",
            email:"",
            password:"",
            userRole:"",
            selectedUser:{},
            isEdit:false,
            userBeingEdited:{},
            updateComponent:false
        }
    }
    componentDidMount=()=>
    {
        UserService.findAllUsers().then(
            users => this.setState({
                users: users
            })
        )
    };

    componentDidUpdate=()=>
    {
    if(this.state.updateComponent)
    {
        this.setState({
            updateComponent:false
        });
        UserService.findAllUsers().then(
            users => this.setState({
                users: users
            })
        )
    }};



    selectUser = user => {
        this.setState({
            selectedUser: user,
        })
    };


    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    addUser = () => {

        if(this.state.isEdit)
        {
            this.triggerEdit()
            return
        }
        var newUser = {
            username: this.state.username.trim(),
            email:this.state.email.trim(),
            password: this.state.password.trim(),
            userRole:this.state.userRole
        }
        console.log("===============",newUser)
        if(newUser.username && newUser.password && newUser.userRole) {
            AdminService.registerUser(newUser).then(
                users => this.setState(
                    {
                        users: users,
                        username:"",
                        email:"",
                        password:"",
                        userRole:"",
                        isEdit:false,
                        userBeingEdited:{}
                    }
                )
            )
        }
    };
    editUser = (user) => {
      console.log("edit : ",user)
        document.getElementById('addUpdateBtn').innerText = 'Update'
        this.setState(
            {
                username:user.username,
                email:user.email,
                password:user.password,
                userRole:user.userRole,
                isEdit:true,
                userBeingEdited:user
            }
        )
    };

    triggerEdit = () => {
        var updatedUser = {
            id:this.state.userBeingEdited.id,
            username: this.state.username.trim(),
            email:this.state.email.trim(),
            password: this.state.password.trim(),
            userRole:this.state.userRole
        }
        AdminService.updateUser(updatedUser).then(user => {
            let users = this.state.users
            for(let i=0;i<users.length;i++)
            {
                if(user.id === users[i].id)
                {
                    users[i] = user
                    break
                }
            }
            this.setState({
                users:users,
                username:'',
                email:'',
                password:'',
                userRole:'',
                isEdit:false,
                userBeingEdited:{},
                updateComponent:true
            });
            document.getElementById('addUpdateBtn').innerText = 'Add'
        })

    }

    deleteUser = (user) => {
        console.log('USERID: ',user.id)
        AdminService.deleteUser(user.id).then(users  => this.setState({
            users: users,
            updateComponent:true
        }))



            /*let i;
            for(i=0;i<users.length;i++)
            {
                if(users[i].id === user.id)
                {
                    break
                }
            }
            users.splice(i,1)
            this.setState({
                users:users,
                updateComponent:true
            })
            this.componentDidUpdate()*/
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
                    <td><input type="text" className="col-sm-5" id="fldUsername" onChange={this.handleInputChange}
                               value={this.state.username} name="username"/></td>
                    <td><input type="text" className="col-sm-5" id="fldEmail" onChange={this.handleInputChange}
                               value={this.state.email} name="email"/></td>
                    <td><input type="text" className="col-sm-5" id="fldPassword" onChange={this.handleInputChange}
                               value={this.state.password} name="password"/></td>
                    <td>
                        <select name="userRole" onChange={this.handleInputChange} value={this.state.userRole}>
                            <option>Select</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </td>
                    <td><button className=" btn btn-md btn-primary pl-lg-1 mb-1" id="addUpdateBtn" onClick={this.addUser}>Add</button></td>
                </tr>
                {this.state.users.length!==0?
                    this.state.users.map((user,index)=>

                        (<UserRow user={user} key={index} selectedUser={this.state.selectedUser} selectUser={this.selectUser} editUser={this.editUser} deleteUser = {this.deleteUser} />) ): "" }
                </tbody>
            </table>
            </div>
        )
    }
}