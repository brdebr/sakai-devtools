const axios = require('axios');

export interface LoginParams {
    id: String,
    pw: String
}

export default class WebServiceManager {
    static async login(params: LoginParams): Promise<String>{
        let { data } = await axios.get('http://localhost:8080/sakai-ws/rest/login/login', {
            headers: {
                'Accept': 'text-plain'
            },
            withCredentials: false,
            params
        })
        return data
    }
}