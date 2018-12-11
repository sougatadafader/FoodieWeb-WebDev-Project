import React, {Component} from 'react'
import './Home.style.css';
import searchBg from './img/search_bg.jpg'
import RecipeService from "../../services/RecipeService";
import ResultCard from "../ResultCard/ResultCard";
import Header from "../Header/Header";
import {Redirect} from "react-router-dom";
import Favorite from "../Favorites/Favorite";
import UserService from "../../services/UserService";

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            recipes:[],
            searchParam:"",
            redirect:false,
            sessionUser:null,
            favorites:[]
        }
    }

    componentDidMount(){
        RecipeService.findHomePageRecipes().then(
            recipes => this.setState({
                recipes: recipes.matches,
                sessionUser:this.props.user
            })
        )
        UserService.findUserInSession().then(
            user => this.setState({
                sessionUser:user
            })
        ).then(()=>RecipeService.findFavtRecipeByUserId(this.state.sessionUser.id)
                .then(favorites=>
                    this.setState({
                        favorites:favorites.length>0?favorites.reverse().slice(0,6):favorites
                    })))}


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={'/search/'+this.state.searchParam} />
        }}

    formChanged = (event) => {
        this.setState({
            searchParam: event.target.value})

    }

    submitForm =()=>{
        if(this.state.searchParam){
            this.setState({
                redirect: true
            })
        }
    }

    render(){
        if(this.state.favorites.length>0){
            console.log("*",this.state.favorites)
        }
        return(
            <div className="container-fluid ml-0 mr-0 pl-0 pr-0 ">
                <Header/>
                <div>
                    <div className="search-container">
                        <img src={searchBg} alt="searchBg" className="col-md-12 ml-0 mr-0 pl-0 pr-0"/>
                        <p className="d-none d-lg-block">FoodieWeb is an online cookbook that
                            allows searching for recipes,
                            sharing recipes to the community,
                            and creating your own grocery list.
                        </p>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2"
                                   type="search"
                                   placeholder="Find a recipe"
                                   aria-label="Search"
                                   value={this.state.searchParam}
                                   onChange={this.formChanged}>
                            </input>
                            <button className="btn btn-outline-success my-2 my-sm-0"
                                    type="submit"
                                    onClick={this.submitForm}>
                                    Search
                            </button>
                            {this.renderRedirect()}
                        </form>
                    </div>

                    <div className="recipe-card-container col-12">
                        {this.state.favorites.length>0?
                            <div className="no-fav mt-4">
                                <h2> Recent Favorite Recipes</h2>
                            </div>:""
                        }
                        <div className="card-deck col-auto mb-4">
                            {this.state.favorites.length>0?
                                 this.state.favorites.map((recipe,index)=>
                                     (<Favorite key={index} recipe={recipe} home={true}/>)):""
                            }
                        </div>
                    </div>
                    <div className="recipe-card-container col-12">
                        {this.state.recipes.length!==0?
                            <div className="no-fav mt-4">
                                <h2> Recent Yummly Recipes</h2>
                            </div>:""
                        }
                        <div className="card-deck col-auto mb-4">
                            {this.state.recipes.length!==0?
                                this.state.recipes.map((recipe,index)=>
                                    (<ResultCard key={index} recipe={recipe}/>)):""
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}