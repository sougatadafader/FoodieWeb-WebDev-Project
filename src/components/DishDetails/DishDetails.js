import React, {Component} from 'react'
import recipeService from "../../services/RecipeService";
import Header from "../Header/Header";
import './DishDetails.css';
import {ToastContainer, ToastStore} from 'react-toasts';
import UserService from "../../services/UserService";

export default class DishDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            dish:[],
            liked : false,
            sessionUser:{}
        }
        const dishId = this.props.match.params.dishId;
    }

    componentDidMount(){
        recipeService.getRecipeDetails(this.props.match.params.dishId)
            .then(dish =>
                this.setState({
                        dish: dish
                    },()=>{
                    UserService.findUserInSession().then(
                        user => this.setState({
                            sessionUser: user
                        },()=>{
                            recipeService.getLike(this.state.dish.id,this.state.sessionUser.id)
                                .then(liked=>
                                    this.setState({
                                        liked:liked
                                    })
                                )
                        })
                    )
                }))}


    createElements(n){
        var i;
        var elements = [];
        for(i =0; i < n; i++){
            elements.push(<i className="fa fa-2x fa-star text-warning"></i>);
        }
        return elements;
    }

    addToFavorite=()=> {
        var recipe = {
            recipeId: this.state.dish.id,
            recipeName: this.state.dish.name
        }

        recipeService.createRecipe(recipe)
            .then(() => {
                //recipe will not be created if id exists
                recipeService.addRecipeToFavorite(this.state.sessionUser.id, recipe).then((data) => {
                    this.setState({
                        liked: true
                    })
                })
            })
    }

    render(){
        console.log(this.state.liked)
        return(
            <div>
                <Header className="ml-0 mr-0 pl-0 pr-0"/>
                <div className="container-fluid">
                    {this.state.dish.length!==0?
                        <div>
                            <h3 className="text-center p-4">
                                {this.state.dish.name}
                                {this.state.sessionUser.username?
                                 this.state.liked?
                                     <button className="ml-1 btn">
                                          <a className='btn text-success fa fa-thumbs-up fa-2x'></a>
                                     </button>:
                                     <button className="ml-1 btn"
                                             onClick={()=>{this.addToFavorite()
                                                 ToastStore.success("Added to favorites!")}}>
                                         <a className='btn text-secondary fa fa-thumbs-up fa-2x'></a>
                                     </button>:""}
                            </h3>
                    <div className="row m-2 ">
                        <div className="col-md-4 m-0">
                        <div className="img-fluid">
                            <div><a><img src={this.state.dish.images[0].hostedLargeUrl}/></a></div>
                            <div className="h5 text-info p-4 time">Time to prepare: {(this.state.dish.prepTime)? this.state.dish.prepTime : "Unknown"}</div>
                            <div className="pills mb-3"> {"#"+ this.state.dish.attributes.course} </div>

                            <ul className="p-0">
                                <span className="h2">Rating </span>
                                {this.createElements(this.state.dish.rating)}
                            </ul>
                        </div>
                        </div>
                        <div className="col-md-8 img-thumbnail">
                            <h2 className="ml-2 mb-4">Ingredients</h2>
                            <ul className="list-group">
                                {
                                    this.state.dish.ingredientLines.map((line, index) =>
                                        <li className="list-group-item list-group-item-info"
                                            key={index}>
                                            {line}
                                            <i className="float-right mr-md-3 fa fa-check text-success"></i>
                                            <i className="btn float-right mr-md-3 fa fa-shopping-basket text-dark"></i>
                                        </li>
                                    )
                                }
                            </ul>
                            <div className="text-center mt-3">
                                <a className="btn btn-success text-light"
                                   href={this.state.dish.source.sourceRecipeUrl}
                                   target="_blank">View Recipe</a>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        
                    </div>
                  </div>:""}
                </div>
                <ToastContainer store={ToastStore}/>
            </div>
        )
    }
}