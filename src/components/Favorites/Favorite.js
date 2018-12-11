import {Link} from "react-router-dom";
import React from "react";
import ReactTooltip from 'react-tooltip';

const Favorite = ({recipe,home}) =>{
    if(home){
        var divCustom ='col-lg-2 col-md-4 col-sm-6 mb-2 mt-5 mx-auto text-center';
    }
    else{
        var divCustom = 'col-lg-2 col-md-4 col-sm-6 mb-2 mt-5 text-center';
    }
    return(
        <div className= {divCustom}>
            <Link to={`/${recipe.recipeId}/view`}>
                <img className="custom-favt" src={recipe.image}
                     alt={recipe.recipeName}
                     data-tip={recipe.recipeName}/>
            </Link>
            <ReactTooltip />
        </div>
    )
}

export default Favorite