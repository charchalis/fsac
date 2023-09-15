import {API_URL} from '../constants'


const authenticate = async (token) => {
    
    try{
        // Make a GET request to the protected route
        const response = await fetch(API_URL + 'authenticate', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        const data = await response.json()
        const userId = data.user.id
        return data 
    }catch{error => console.error('Access to protected route failed:', error)};
    
    return;
}


export default authenticate;