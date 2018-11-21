import React, {Component} from 'react'
import './Home.style.css';
import searchBg from './img/search_bg.jpg'
import recipe from './img/recipe1.jpg'


export default class Home extends Component {

    render(){
        return(
            <div className="container-fluid ml-0 mr-0 pl-0 pr-0 ">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">FoodieWeb</a>

                    <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sign In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link register" href="#" id="register">Register</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div>
                    <div className="search-container">
                        <img src={searchBg} alt="searchBg" className="col-md-12 ml-0 mr-0 pl-0 pr-0"/>
                        <p className="d-none d-lg-block">FoodieWeb is an online cookbook that
                            allows searching for recipes,
                            sharing recipes to the community,
                            and creating your own grocery list.
                        </p>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Find a recipe" aria-label="Search"></input>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>

                    <div className="recipe-card-container col-12">
                        <div className="card-deck col-auto mb-4">
                            <div className="card">
                                <img className="card-img-top" src={recipe} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">Recipe title</h5>
                                    <p className="card-text">
                                        <small className="text-muted">Created by [user]</small>
                                    </p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src={recipe} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">Recipe title</h5>
                                    <p className="card-text">
                                        <small className="text-muted">Created by [user]</small>
                                    </p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src={recipe} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">Recipe title</h5>
                                    <p className="card-text">
                                        <small className="text-muted">Created by [user]</small>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}