export interface LoginParams {
  id: String;
  pw: String;
}

export interface sakaiParam {
  sessionid: String;
}

export interface addUserParams {
  eid: String;
  firstname: String;
  lastname: String;
  email: String;
  type?: String;
  password: String;
}

const convert = require("xml-js");
const axios = require("axios");
const restEndpoint = "/sakai-ws/rest";
const headers = {
  Accept: "text-plain"
};

export default class WebServiceManager {
  static async login(params: LoginParams, baseURL: String): Promise<String> {
    let endpoint = "/login/login";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params
    });
    return data;
  }
  static async resetAllUserWorkspace(
    params: sakaiParam,
    baseURL: String
  ): Promise<Boolean> {
    let endpoint = "/sakai/resetAllUserWorkspace";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params
    });
    return data;
  }
  static async getAllUsers(
    params: sakaiParam,
    baseURL: String
  ): Promise<any> {
    let endpoint = "/sakai/getAllUsers";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params
    });
    var result = convert.xml2js(data, {
      ignoreComment: true,
      alwaysChildren: true
    });
      // array de 8
    let arrayList =  result.elements[0].elements.map((el:any) => {
      let aux = el.elements.map((el:any) => {
        return {
          [el.name]: el.elements[0] ? el.elements[0].text : null
        }
      }) // item
      //aux = arry de 4 prop y valor
      return aux.reduce((acc:any, val:any) => {
        return {...acc,...val}
      },{})
    })
    
    return arrayList;
  }
  static async addNewUser(
    params: addUserParams,
    baseURL: String,
    sessionid: String
  ): Promise<String> {
    let endpoint = "/sakai/addNewUser";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { sessionid, ...params }
    });
    return data;
  }
}
