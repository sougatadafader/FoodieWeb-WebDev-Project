var baseUrl = "//foodiewebserver.herokuapp.com/";

export default class AdminService {

    //Create
    /*This will return a list after registering*/
    static registerUser = user =>{
        const url=baseUrl+"api/register";
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>response.json())
    }
    //Read
    static findAllUsers =() => {
        const url=baseUrl+"api/user";
        return fetch(url,{
            credentials: 'include'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .catch((error) => {
                throw error;
            });
    }

    //Update
    static updateUser = (user) =>{
        const url = baseUrl+ "api/user/"+user.id;
        return fetch(url,{
            method: 'PUT',
            credentials: 'include',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }

   //Delete
    static deleteUser = (uId)=>
    {
        const url=baseUrl+"api/user/"+uId;

        return fetch(url,{
            method: 'DELETE',
            credentials: 'include'
        }).then(response =>response.json())};
}