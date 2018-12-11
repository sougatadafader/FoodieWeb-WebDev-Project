import {Link} from "react-router-dom";
import React from "react";

const Favorite = ({recipe}) =>{
    return(
    <div className= "col-lg-3 col-md-4 col-sm-12 mb-2 mt-5">
        <div className="card">
            <img className="card-img-top" src={recipe.image}
                 alt={recipe.recipeName}/>
            <div className="card-body">
                <Link to={`/${recipe.recipeId}/view`}>
                    <h5 className="card-title">{recipe.recipeName}</h5>
                </Link>
                <p className="card-text">
                    <small className="text-muted">Created by {recipe.creator}</small>
                </p>
            </div>
        </div>
    </div>
    )
}

export default Favorite