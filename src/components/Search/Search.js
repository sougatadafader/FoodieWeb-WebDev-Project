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
            searchParam:"any",
            course:"any"
        }
    }

    findRecipes(name,course){
        RecipeService.findRecipes(name, course).then(
            recipes => this.setState({
                recipes: recipes.matches,
                searchParam:name||"any",
                course:course||"any"
            })
        )
    }

    componentDidMount(){
        this.findRecipes(this.props.match.params.searchCriteria,
            this.props.match.params.course);

    }

    componentWillReceiveProps(nextProps){
        this.findRecipes(nextProps.match.params.searchCriteria,
            nextProps.match.params.course);
    }


    formChanged = (event) => {
        event.preventDefault();
        this.setState({
            searchParam: event.target.value||"any"})
    }

    submitForm =()=>{
        console.log(this.state.course)
        let queryString = "/search/"+this.state.searchParam+"/"+this.state.course;
        console.log(queryString)
        this.props.history.push(queryString);
    }


    setCourse = (course) =>{
        console.log(course)
        this.setState({
                 course:course},()=>{
            this.submitForm();
        })
    }

    resetCourse = () =>{
            this.setCourse("any");
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
                                    value={this.state.searchParam==="any"?"":this.state.searchParam}
                                    onChange={this.formChanged}
                                    >
                             </input>
                             <button className="btn btn-outline-success my-2 my-sm-0"
                                     onClick={this.submitForm}>
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

                           {/*{pages.length>1?*/}
                            {/*<div className="offset-2 col-md-10 text-center mb-2">*/}
                             {/*{*/}
                                 {/*pages.map((page,index)=>*/}
                                   {/*<span className={this.state.page == page?*/}
                                       {/*"page active-page":"page"}*/}
                                         {/*key={index}*/}
                                         {/*onClick={() => this.setPage(page)}*/}
                                   {/*>{page}</span>*/}
                                 {/*)*/}
                             {/*}*/}
                            {/*</div>:""}*/}

                     </div>
                 </div>
             </div>


        )
    }
}


