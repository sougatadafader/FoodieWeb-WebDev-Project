var baseUrl = "http://localhost:8080/";

export default class UserService {

    static registerUser = user =>{
        const url=baseUrl+"api/register/systemuser";
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>response.json())
    }

    static login = user =>{
        const url=baseUrl+"api/login";
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response =>response.json())
    }

    static updateUser = (userId,user) =>{
        const url = baseUrl+ "/api/user/"+userId;
        return fetch(url,{
            method: 'PUT',
            credentials: 'include',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }

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

    static findUserInSession =() => {
        const url=baseUrl+"api/profile";
        return fetch(url,{
            credentials: 'include'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .catch((error) => {
                throw error;
            });
    }

    static findUserById =(userId) => {
        const url=baseUrl+"api/user/"+userId;
        return fetch(url,{
            credentials: 'include'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .catch((error) => {
                throw error;
            });
    }

    /**
     *
     * @returns {Promise<Response | never>}
     */
   static logout = () =>{
        console.log("logging out")
        const url = baseUrl+"api/logout";
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
        }})
   }

}

