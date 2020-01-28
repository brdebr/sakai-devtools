import {
  siteParams,
  getAllSitesForCurrentUserResponse,
  addUserParams,
  LoginParams,
  sessionIdParam,
  userResponse,
  setUserPropertyParams,
  getUserPropertyResponse,
  getUserPropertyParams
} from "@/models/WsInterfaces";

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

  static async logout(
    params: sessionIdParam,
    baseURL: String
  ): Promise<String> {
    let endpoint = "/login/logout";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params
    });
    return data;
  }

  static async resetAllUserWorkspace(
    params: sessionIdParam,
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
    params: sessionIdParam,
    baseURL: String
  ): Promise<Array<userResponse>> {
    let endpoint = "/sakai/getAllUsers";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params
    });
    var result = convert.xml2js(data, {
      ignoreComment: true,
      compact: true,
      alwaysChildren: true
    });

    let list = result.list.item.map((el: any) => {
      let aux: { [index: string]: any } = {};
      for (const key in el) {
        aux[key] = el[key]._text ? el[key]._text : null;
      }
      return aux;
    });
    return list;
  }

  static async setUserProperty(
    params: sessionIdParam,
    prop: setUserPropertyParams,
    baseURL: String
  ): Promise<String> {
    let endpoint = "/sakai/setUserProperty";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: {...params, ...prop}
    });

    return data;
  }

  static async getUserProperty(
    params: sessionIdParam,
    prop: getUserPropertyParams,
    baseURL: String
  ): Promise<getUserPropertyResponse> {
    let endpoint = "/sakai/getUserProperty";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: {...params, ...prop}
    });

    return data;
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

  static async addNewSite(
    params: siteParams,
    baseURL: String,
    sessionid: String
  ): Promise<String> {
    let endpoint = "/sakai/addNewSite";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { sessionid, ...params }
    });
    return data;
  }

  static async getAllSitesForCurrentUser(
    params: sessionIdParam,
    baseURL: String
  ): Promise<Array<getAllSitesForCurrentUserResponse>> {
    let endpoint = "/sakai/getAllSitesForCurrentUser";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params
    });

    var result = convert.xml2js(data, {
      ignoreComment: true,
      compact: true,
      alwaysChildren: true
    });

    let list = result.list.item.map((el: any) => {
      let aux: { [index: string]: any } = {};
      for (const key in el) {
        aux[key] = el[key]._text ? el[key]._text : null;
      }
      return aux;
    });

    return list;
  }
}
