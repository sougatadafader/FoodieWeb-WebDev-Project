import React, {Component} from 'react'
import recipeService from "../../services/RecipeService";
import Header from "../Header/Header";
import './DishDetails.css';
import {ToastContainer, ToastStore} from 'react-toasts';
import UserService from "../../services/UserService";
import {Link} from 'react-router-dom'
import pp from './img/avator.png'
import time from './img/time.png'
import Moment from 'react-moment';


export default class DishDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            dish:[],
            liked : false,
            sessionUser:{},
            comment: [],
            text:""
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
                            recipeService.findRecipeById(this.state.dish.id)
                                .then(data => (data.comments===undefined) ?
                                    {}:

                                    this.setState({

                                         comment:data.comments.reverse()
                                     })
                                )
                        }
                        ))}))}


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
            recipeName: this.state.dish.name,
            creator:this.state.dish.source.sourceDisplayName,
            image:this.state.dish.images[0].hostedLargeUrl
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

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    };

    handleComment = event => {
        event.preventDefault();
        let newComment = {
            text: this.state.text.trim()
        }

        let recipe = {
            recipeId: this.state.dish.id,
            recipeName: this.state.dish.name
        }

        if(newComment.text){
            recipeService.createRecipe(recipe)
                .then(() => {
                    recipeService.createComment(this.state.dish.id,
                                               this.state.sessionUser.id,
                                                newComment).then((data) => {
                        this.setState({
                            comment: data,
                            text:""
                        })
                    })
                })
        }
    };


    render(){

        return(
                <div className="container-fluid">
                    <Header/>
                    {this.state.dish.length!==0?
                        <div>
                            <h3 className="text-center p-4">
                                {this.state.dish.name}
                                {this.state.sessionUser.username?
                                 this.state.liked?
                                     <a className='btn text-success fa fa-thumbs-up'></a>
                                     :
                                     <a onClick={()=>{this.addToFavorite()
                                     ToastStore.success("Added to favorites!")}}
                                        className='btn text-secondary fa fa-thumbs-up'></a>
                                     :""}
                            </h3>
                    <div className="row m-2 ">
                        <div className="col-md-4 m-0">
                        <div className="img-fluid">

                            <div><a><img className="rounded" src={this.state.dish.images[0].hostedLargeUrl}/></a></div>


                            <div className="h5 text-info p-4 time">
                                <img src={time} className="icon-position"/>
                                Time to prepare: {(this.state.dish.prepTime)? this.state.dish.prepTime : "Unknown"}</div>
                            <div className="pills mb-3"> {"#"+ this.state.dish.attributes.course} </div>

                            <ul className="p-0">
                                <span className="h2">Rating </span>
                                {this.createElements(this.state.dish.rating)}
                            </ul>
                        </div>
                        </div>
                        <div className="col-md-7 img-thumbnail">
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
                        {!this.state.sessionUser.username?
                        <div className="col-md-12 mb-2 mt-4 comment text-center">
                            <em>Please <Link to="/login">login</Link> to share your thoughts</em>
                        </div>:

                        <div className="col-md-12 comment-div mb-2">
                                <form id="comment-form">
                                    <label className="comment-header">Comment</label>
                                    <textarea className="form-control custom mb-2" rows="4"
                                              value={this.state.text}
                                              name="text"
                                              onChange={this.handleInputChange}
                                              placeholder="Write your comment here"
                                              ></textarea>
                                    <button type="submit"
                                            onClick={this.handleComment}
                                            className="btn btn-success mt-1 mb-2">
                                        Submit
                                    </button>
                                </form>

                                <div className="show-comments-div">
                                    {this.state.comment!=undefined?
                                        this.state.comment.map((comment, index)=>
                                        <div className="single-comment-div media p-3 mt-2">
                                            <Link to={`/profile/${comment.user.id}`}><img src={pp}
                                                  className="mr-3 rounded-circle commenter-img" alt="farha"/>
                                            </Link>
                                            <div className="media-body">
                                               <h6 className="commenter">
                                                   {/*link to other users profile page*/}
                                                  <Link to={`/profile/${comment.user.id}`}>{comment.user.username} </Link>
                                                  <span className="small-italic">
                                                      Posted on <Moment format="YYYY/MM/DD HH:mm">{comment.created}</Moment>
                                                  </span>
                                               </h6>
                                               <p>{comment.text}</p>
                                            </div>
                                        </div>
                                    ):""}
                                </div>
                            </div>}
                    </div>

                  </div>:""}
                    <ToastContainer store={ToastStore}/>
                </div>


        )
    }
}