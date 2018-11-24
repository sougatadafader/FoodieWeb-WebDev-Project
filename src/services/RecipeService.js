const appId = "2d8ae64b";
const appKey = "00c159ff00a68d8e4e38083ac3a4bdd6";
let yummlyUrl = "http://api.yummly.com/v1/api/recipes?_app_id="+appId+"&_app_key="+appKey;

export default class RecipeService {
    /**
     * renders top(!) 8 results for home page that include images for anonymous users.
     * Must display specific content for the logged in user. The content must be dynamic based
     * on the most recent data entered by the logged in user. For instance, you might display
     * snippets and links to the most recent post or review created by the logged in user
     */
    static findHomePageRecipes() {
        var url = yummlyUrl + "&maxResult=8&requirePictures=true";
        console.log(url);
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());
    }

    static findRecipesByName(searchParam){
        var url = yummlyUrl + "&q="+searchParam;
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
        if(name!=="any"){
            url+="&q="+name;
        }
        if(course!=="any"){
            url+="&allowedCourse[]=course^course-"+course;
        }
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json());
    }

    static findNumberOfRecipes(name,course){
        var maxResult = 100;
        var url = yummlyUrl+"&maxResult="+maxResult;
        if(name!=="any"){
            url+="&q="+name;
        }
        if(course!=="any"){
            url+="&allowedCourse[]=course^course-"+course;
        }
        return fetch(url, {
            credentials: 'include'
        }).then(response => response.json()).then(res => res.matches.length);
    }
}