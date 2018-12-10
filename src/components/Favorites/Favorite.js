import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import RecipeService from "../../services/RecipeService";

export default class Favorite extends React.Component{

    constructor(props){
        super(props)
        this.state={
            favorites:[]
        }
    }

    componentDidMount(){
        // alert(this.props.userId)
         RecipeService.findFavtRecipeByUserId(this.props.userId)
             .then(favorites=>
                 this.setState({
                     favorites:favorites
                 })

             )
    }


    render(){
        console.log(this.state.favorites)
        return(
            <div>
                Fav {this.props.userId}
                {this.state.favorites.length>0?
                    this.state.favorites.map((recipe,index)=><div>{recipe.recipeId}</div>):""}

            </div>
        )
    }


}
