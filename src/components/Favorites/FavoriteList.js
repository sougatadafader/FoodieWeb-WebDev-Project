import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import RecipeService from "../../services/RecipeService";
import courses from "../Search/courses";
import recipeImg from "../ResultCard/img/recipe1.jpg";
import './Favorite.style.css';
import Favorite from "./Favorite";

export default class FavoriteList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            favorites:[]
        }
    }

    componentDidMount(){
         RecipeService.findFavtRecipeByUserId(this.props.userId)
             .then(favorites=>
                 this.setState({
                     favorites:favorites
                 })

             )
    }

    componentWillReceiveProps(nextProps){
        RecipeService.findFavtRecipeByUserId(nextProps.userId)
            .then(favorites=>
                this.setState({
                    favorites:favorites
                }))}


    render(){
        return(
          <div className="container">
              {this.state.favorites.length<=0?
                  <div className="no-fav mt-4">
                      <h2> No Recipes Added to Favorites</h2>
                  </div>
                  :
                  <div>
                    <h2 className="text-center mt-4 title-fav">
                        <i className="fa fa-heart"></i>
                        Favorite Recipes
                        <i className="fa fa-heart"></i>
                    </h2>
                    <div className="row">
                       {this.state.favorites.map((recipe, index) =>
                           <Favorite recipe={recipe}/>
                       )}
                   </div>
                  </div>}
          </div>
        )
    }


}
