import React from 'react'
import {Link} from 'react-router-dom'
import './Signin.style.css';

const signin = () =>
    <div className="container signin-container">
        <h1>Sign In for FoodieWeb</h1>

        <form className="form-group form-inline">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <input className="form-control mr-sm-2"
                   type="text"
                   placeholder="Username"
                   aria-label="Username">
            </input>
        </form>
        <form className="form-group form-inline">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <input className="form-control mr-sm-2"
                   type="password"
                   placeholder="******"
                   aria-label="Password">
            </input>
        </form>
        <div className="col-sm-5">
            <button type="submit"
                    className="btn btn-primary btn-block">Sign In
            </button>
            <div className="row">
                <div className="col-12">
                    <Link to={"/"} className="float-left">Cancel</Link>
                    <Link to={"/register"} className="nav-link float-right">Register</Link>
                </div>
            </div>
        </div>
    </div>

export default signin;