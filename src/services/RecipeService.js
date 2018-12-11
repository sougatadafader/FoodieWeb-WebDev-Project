const appId = "2d8ae64b";
const appKey = "00c159ff00a68d8e4e38083ac3a4bdd6";
let yummlyUrl = "https://api.yummly.com/v1/api/recipes?_app_id="+appId+"&_app_key="+appKey;
var baseUrl = "http://foodiewebserver.herokuapp.com/";
export default class RecipeService {
    /**
     * renders top(!) 8 results for home page that include images for anonymous users.
     * Must display specific content for the logged in user. The content must be dynamic based
     * on the most recent data entered by the logged in user. For instance, you might display
     * snippets and links to the most recent post or review created by the logged in user
     */
    static findHomePageRecipes() {
        let url = yummlyUrl + "&maxResult=8&requirePictures=true";
        console.log(url);
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());
    }

    static findRecipesByName(searchParam){
        let url = yummlyUrl + "&q="+searchParam;
        console.log(url);
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());

    }
    static findRecipesByNameAndCourse(name,course,str){
        let maxResult = 8;
        let start = (str-1)*maxResult;
        let url = yummlyUrl+"&maxResult="+maxResult;
        if(str){
            url+="&start="+start;
        }
        if(name!=="any" && name!=="undefined"){
            url+="&q="+name;
        }
        if(course!=="any" && course!=="undefined"){
            url+="&allowedCourse[]=course^course-"+course;
        }
        console.log(url);
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());
    }

    static findNumberOfRecipes(name,course){
        let maxResult = 100;
        let url = yummlyUrl+"&maxResult="+maxResult;
        if(name!=="any" && name!==undefined){
            url+="&q="+name;
        }
        if(course!=="any" && course!==undefined){
            url+="&allowedCourse[]=course^course-"+course;
        }
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json()).then(res => res.matches.length);
    }


    static findRecipes(name,course){
        let url = yummlyUrl;
        if(name!=="any" && name!==undefined){
            url+="&q="+name;
        }
        if(course!=="any" && course!==undefined){
            url+="&allowedCourse[]=course^course-"+course;
        }
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());
    }


    static getRecipeDetails(recipeId)
    {
        let url="https://api.yummly.com/v1/api/recipe/"+recipeId+"?_app_id=2d8ae64b&_app_key=00c159ff00a68d8e4e38083ac3a4bdd6"
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());

    }

    static getLike(recipeId,userId){
        const url=baseUrl+"api/recipe/"+recipeId+"/user/"+userId;
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());
    }

    static createRecipe(recipe){
        const url=baseUrl+"api/recipe";
        console.log(url);
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .catch((error) => {
                throw error;
            });
    }

    static addRecipeToFavorite(userId,recipe){
        const url=baseUrl+"api/recipe/"+recipe.recipeId+"/user/"+userId;
        console.log(url);
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>response.json())
    }

    static findRecipeById(recipeId){
        const url=baseUrl+"api/recipe/string/"+recipeId;
        console.log(url)
        return fetch(url, {
            credentials: 'include'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .catch((error) => {
                throw error;
            });
    }

    static createComment(recipeId,userId,comment){
        const url=baseUrl+"api/recipe/"+recipeId+"/user/"+userId+"/comment";
        console.log(url);
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .catch((error) => {
                throw error;
            });
    }
}