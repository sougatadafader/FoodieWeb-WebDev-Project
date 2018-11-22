import React from 'react'
import RecipeService from "../../services/RecipeService";
import ResultCard from "../ResultCard/ResultCard";
import Header from "../Header/Header";
import "./Search.style.css";
import courses from "./courses.json";
import reset from './img/reset.png'

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state={
            recipes:[],
            searchParam:this.props.match.params.searchCriteria,
            course:this.props.match.params.course,
            cuisine:""
        }
    }

    componentDidMount(){
        RecipeService.findRecipesByName(this.state.searchParam).then(
            recipes => this.setState({
                recipes: recipes.matches
            })
        )
    }


    findRecipes(){
        RecipeService.findRecipesByNameAndCourse(this.state.searchParam,this.state.course).then(
            recipes => this.setState({
                recipes: recipes.matches
            })
        )
    }

    formChanged = (event) => {
        this.setState({
            searchParam: event.target.value})
    }

    submitForm =()=>{
        console.log("submit",this.state.searchParam, this.state.course);
        let queryString = "/search";
        if(this.state.searchParam!==""&&this.state.searchParam!==undefined){
            queryString+="/"+this.state.searchParam;
        }
        if(this.state.course!==""&&this.state.course!==undefined){
            queryString+="/"+this.state.course;
        }
        this.findRecipes();
        this.props.history.push(queryString);
    }

    setCourse = (course) =>{
        this.setState({
                course:course
            },()=>{
            this.submitForm();
        })
    }

    resetCourse = () =>{
        this.setState({
            course:""
        },()=>{
            this.setCourse(this.state.course)
        })
    }

    render(){
        return(
             <div className="search">
                <Header/>
                 <div className="container-fluid">
                     <div className="search-container mt-5">
                         <form className="form-inline">
                             <input className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Find a recipe"
                                    value={this.state.searchParam}
                                    onChange={this.formChanged}
                                    >
                             </input>
                             <button className="btn btn-outline-success my-2 my-sm-0"
                                     type="submit" onClick={this.submitForm}>
                                 Search
                             </button>
                         </form>
                     </div>
                     <div className="row">
                             <div className="col-md-2 filter-div mt-5 text-center">
                                 <div className="filter-header">
                                     <h5>Course</h5>
                                 </div>
                                 {courses.map((course, index) =>
                                     <div className={this.state.course === course?
                                                     "active filter-option mb-1":
                                                     "filter-option mb-1"} key={index}
                                          onClick={() => this.setCourse(course)}>
                                         {course}
                                     </div>
                                 )}
                                 <div className="text-right reset" onClick={this.resetCourse}>
                                     <img src={reset}/>Reset
                                 </div>
                             </div>
                             <div className="col-md-10">
                                 <div className="card-deck col-auto mb-4">
                                     {this.state.recipes.length!==0?
                                         this.state.recipes.map((recipe,index)=>
                                             (<ResultCard key={index} recipe={recipe}/>)):""
                                     }
                                 </div>
                             </div>
                     </div>
                 </div>
             </div>


        )
    }
}


