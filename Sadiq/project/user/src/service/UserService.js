import axios from "axios";
import { API_URL } from "../util/API";



const userRefSubmit = async(formdata, id) =>{
    let response = await axios.post(`${API_URL}/user/authentication/referral`,{formdata : formdata, id : id} )
    return response.data;
}

export {userRefSubmit};