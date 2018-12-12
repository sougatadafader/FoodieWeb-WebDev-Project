import React from 'react'
import RecipeService from "../../services/RecipeService";
import ResultCard from "../ResultCard/ResultCard";
import Header from "../Header/Header";
import "./Search.style.css";
import courses from "./courses.json";
import reset from './img/reset.png'
const maxResult = 8;

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state={
            recipes:[],
            searchParam:"any",
            course:"any",
            number: 0,
            page:1
        }
    }

    findRecipes(name,course,page){
        if(page*maxResult-maxResult>this.state.number){
            console.log(page*maxResult-maxResult,this.state.number);
            page = 1;
        }
        RecipeService.findRecipesByNameAndCourse(name, course,page).then(
            recipes => this.setState({
                recipes: recipes.matches,
                searchParam:name||"any",
                course:course||"any",
                page:page||1
            })
        )
    }

    findNumberOfRecipes(name,course,page){
        RecipeService.findNumberOfRecipes(name, course).then(
            numberOfRecipes => this.setState({
                number:numberOfRecipes
            },()=>{
                this.findRecipes(name,course,page)
            })
        )
    }
    componentDidMount(){
        this.findNumberOfRecipes(this.props.match.params.searchCriteria,
            this.props.match.params.course,this.props.match.params.page);

    }

    componentWillReceiveProps(nextProps){
        this.findNumberOfRecipes(nextProps.match.params.searchCriteria,
            nextProps.match.params.course,nextProps.match.params.page);
    }


    formChanged = (event) => {
        event.preventDefault();
        this.setState({
            searchParam: event.target.value||"any"})
    }

    submitForm =()=>{
        let queryString = "/search/"+this.state.searchParam+"/"+this.state.course+"/"+this.state.page;
        this.props.history.push(queryString);
    }

    searchRecipe = ()=>{
        this.setState({
            page:1},()=>{
            this.submitForm();
        })
    }

    setCourse = (course) =>{
        this.setState({
            course:course||"any",
            page:1},()=>{
            this.submitForm();
        })
    }

    setPage = (page) =>{
        this.setState({
            page:page},()=>{
            this.submitForm();
        })
    }

    pagination=()=>{
        let numberOfPages = Math.ceil(this.state.number/maxResult);
        let pages=[];
        for(var i = 1; i<=numberOfPages;i++){
            pages.push(i);
        }
        return pages;
    }

    resetCourse = () =>{
        this.setCourse("any");
    }

    render(){
        let pages = this.pagination();
        return(
            <div className="search">
                <Header/>
                <div className="container-fluid">
                    <div className="search-container mt-5">
                        <form className="form-inline">
                            <input className="form-control mr-sm-2"
                                   type="search"
                                   placeholder="Find a recipe"
                                   value={this.state.searchParam==="any"?"":this.state.searchParam}
                                   onChange={this.formChanged}
                            >
                            </input>
                            <button className="btn btn-outline-success my-2 my-sm-0"
                                    onClick={this.searchRecipe}>
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
                                {this.state.recipes!==undefined?
                                    this.state.recipes.map((recipe,index)=>
                                        (<ResultCard key={index} recipe={recipe}/>)):""
                                }
                                {/*else no recipe found*/}
                            </div>
                        </div>

                        {pages.length>1?
                            <div className="offset-2 col-md-10 text-center mb-2">
                                {
                                    pages.map((page,index)=>
                                        <span className={this.state.page == page?
                                            "page active-page":"page"}
                                              key={index}
                                              onClick={() => this.setPage(page)}
                                        >{page}</span>
                                    )
                                }
                            </div>:""}

                    </div>
                </div>
            </div>


        )
    }
}
