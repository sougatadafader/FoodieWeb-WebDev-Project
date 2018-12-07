import React, {Component} from 'react'
import recipeService from "../../services/RecipeService";
import Header from "../Header/Header";
import './DishDetails.css';
import like from './img/like.png'

export default class DishDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            dish:[]
        }
        const dishId = this.props.match.params.dishId;
    }

    componentDidMount(){
        recipeService.getRecipeDetails(this.props.match.params.dishId)
            .then(dish =>
                this.setState({dish: dish}))

    }
    createElements(n){
        var i;
        var elements = [];
        for(i =0; i < n; i++){
            elements.push(<i className="fa fa-2x fa-star text-warning"></i>);
        }
        return elements;
    }

    render(){
        console.log(this.state.dish)
        return(
            <div>
                <Header className="ml-0 mr-0 pl-0 pr-0"/>
                <div className="container-fluid">
                    {this.state.dish.length!==0?
                        <div>
                            <h3 className="text-center p-4">{this.state.dish.name} <img src={like}/></h3>
                    <div className="row m-2 ">
                        <div className="col-md-4 m-0">
                        <div className="img-fluid">
                            <div><a><img src={this.state.dish.images[0].hostedLargeUrl}/></a></div>
                            <div className="h5 text-info p-4">Time to prepare: {(this.state.dish.prepTime)? this.state.dish.prepTime : "Unknown"}</div>
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
                                        <li className="list-group-item list-group-item-info">
                                            {line}
                                            <i className="float-right mr-md-3 fa fa-shopping-basket"></i>
                                        </li>
                                    )
                                }
                            </ul>
                            <div className="text-center mt-3">
                                <a className="btn btn-success text-light" href={this.state.dish.source.sourceRecipeUrl} target="_blank">View Recipe</a>
                            </div>
                        </div>

                    </div>
                        </div>:""}
                </div>
            </div>
        )
    }
}