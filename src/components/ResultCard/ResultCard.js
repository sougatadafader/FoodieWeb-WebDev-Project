import React from 'react'
import recipeImg from './img/recipe1.jpg'
import {Link} from 'react-router-dom'
import './ResultCard.style.css';

const ResultCard = ({recipe}) =>{

    function processImageSize(img)
    {
        return img.replace("s90","s320-c-rj-v1-e365");
    }
    return(
    <div className= "col-lg-3 col-md-4 col-sm-12 mb-2 mt-5">
        <div className="card">
            <img className="card-img-top" src={recipe.smallImageUrls!==undefined?
                                                processImageSize(recipe.smallImageUrls[0]):recipeImg}
                 alt={recipe.recipeName}/>
            <div className="card-body">
                <Link to={`/${recipe.id}/view`}><h5 className="card-title">{recipe.recipeName}</h5></Link>
                <p className="card-text">
                    <small className="text-muted">Created by {recipe.sourceDisplayName}</small>
                </p>
            </div>
        </div>
    </div>)
}


export default ResultCard