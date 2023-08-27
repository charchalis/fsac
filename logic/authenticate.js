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
        //console.log('Protected route response:', data);
        console.log(response.status)
    
        const data = await response.json()
        console.log("data: ", data)    
        const userId = data.user.id
        console.log("userId: ", userId)    
        return data 
    }catch{error => console.error('Access to protected route failed:', error)};
    
    return;
}


export default authenticate;