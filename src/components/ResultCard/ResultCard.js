import React from 'react'

const ResultCard = ({recipe}) =>{

    function processImageSize(img)
    {
        return img.replace("s90","s320-c-rj-v1-e365");
    }
    return(
    <div className= "col-lg-3 col-md-4 col-sm-12 mb-3">
        <div className="card">
            <img className="card-img-top" src={processImageSize(recipe.smallImageUrls[0])}
                 alt={recipe.recipeName}/>
            <div className="card-body">
                <h5 className="card-title">{recipe.recipeName}</h5>
                <p className="card-text">
                    <small className="text-muted">Created by {recipe.sourceDisplayName}</small>
                </p>
            </div>
        </div>
    </div>)
}


export default ResultCard