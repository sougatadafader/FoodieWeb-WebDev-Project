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

    static findUserInSession =() => {
        const url=baseUrl+"api/profile";
        return fetch(url,{
            credentials: 'include'
        }).then(response =>response.json())
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
            headers: {
                'Content-Type': 'application/json'
        }}).then(response =>response.json())

   }

}

