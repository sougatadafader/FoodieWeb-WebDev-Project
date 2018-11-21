const appId = "2d8ae64b";
const appKey = "00c159ff00a68d8e4e38083ac3a4bdd6";
let yummlyUrl = "http://api.yummly.com/v1/api/recipes?_app_id="+appId+"&_app_key="+appKey;

export default class RecipeService {
    /**
     * renders top(!) 8 results for home page that include images
     */
    static findHomePageRecipes() {
        var url = yummlyUrl + "&maxResult=8&requirePictures=true";
        console.log(url);
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());
    }
}