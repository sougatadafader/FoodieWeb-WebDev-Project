import React from 'react'
import RecipeService from "../../services/RecipeService";
import ResultCard from "../ResultCard/ResultCard";
import Header from "../Header/Header";
export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state={
            recipes:[]
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.searchCriteria);
        RecipeService.findRecipesByName(this.props.match.params.searchCriteria).then(
            recipes => this.setState({
                recipes: recipes.matches
            })
        )
    }

    render(){
        return(
            <div className="container-fluid ml-0 mr-0 pl-0 pr-0 ">
                <Header/>
                <h2>Need to add search box with other search criteria </h2>
                <div className="recipe-card-container col-12">
                    <div className="card-deck col-auto mb-4">
                        {this.state.recipes.length!==0?
                            this.state.recipes.map((recipe,index)=>
                                (<ResultCard key={index} recipe={recipe}/>)):""
                        }
                    </div>
                </div>
            </div>
        )
    }
}


