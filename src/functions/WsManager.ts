import {
  siteParams,
  getAllSitesForCurrentUserResponse,
  addUserParams,
  LoginParams,
  sessionIdParam,
  userResponse,
  setUserPropertyParams,
  getUserPropertyResponse,
  getUserPropertyParams,
  getServerPropertyParams,
  getServerPropertyResponse,
  setServerPropertyParams,
  setServerPropertyResponse
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
    sessionId: sessionIdParam,
    prop: setUserPropertyParams,
    baseURL: String
  ): Promise<String> {
    let endpoint = "/sakai/setUserProperty";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { ...sessionId, ...prop }
    });

    return data;
  }

  static async getUserProperty(
    sessionId: sessionIdParam,
    prop: getUserPropertyParams,
    baseURL: String
  ): Promise<getUserPropertyResponse> {
    let endpoint = "/sakai/getUserProperty";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { ...sessionId, ...prop }
    });

    return data;
  }

  static async getAllUserProperties(
    sessionId: sessionIdParam,
    eid: String,
    baseURL: String
  ): Promise<Object> {
    let endpoint = "/sakai/getAllUserProperties";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { ...sessionId, eid }
    });

    var result = convert.xml2js(data, {
      ignoreComment: true,
      compact: true,
      alwaysChildren: true
    });

    let obj = result.list.property
      .map((el: any) => {
        let aux: { [index: string]: any } = {};
        for (const key in el) {
          aux[key] = el[key]._text ? el[key]._text : null;
        }
        return aux;
      })
      .reduce((acc: Object, el: Object) => {
        return { ...acc, ...el };
      }, {});

    return obj;
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
  static async removeSite(
    sessionId: sessionIdParam,
    siteid: String,
    baseURL: String
  ): Promise<String> {
    let endpoint = "/sakai/removeSite";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { ...sessionId, siteid }
    });
    return data;
  }

  static async getAllSitesForCurrentUser(
    params: sessionIdParam,
    baseURL: String
  ): Promise<getAllSitesForCurrentUserResponse> {
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

  static async getServerProperty(
    sessionId: sessionIdParam,
    prop: getServerPropertyParams,
    baseURL: String
  ): Promise<String> {
    let endpoint = "/configuration/getProperty";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { ...sessionId, ...prop }
    });

    return data;
  }

  static async setServerProperty(
    sessionId: sessionIdParam,
    prop: setServerPropertyParams,
    baseURL: String
  ): Promise<String> {
    let endpoint = "/configuration/setProperty";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { ...sessionId, ...prop }
    });

    return data;
  }

  static async getPagesAndToolsForSiteForCurrentUser(
    siteid: String,
    params: sessionIdParam,
    baseURL: String
  ): Promise<Array<getAllSitesForCurrentUserResponse>> {
    let endpoint = "/sakai/getPagesAndToolsForSiteForCurrentUser";
    let { data } = await axios.get(baseURL + restEndpoint + endpoint, {
      headers,
      params: { ...params, siteid }
    });

    var result = convert.xml2js(data, {
      ignoreComment: true,
      compact: true,
      alwaysChildren: true
    });

    console.log(result);

    let list = result.site.pages.page.map((el: any) => {
      let aux: { [index: string]: any } = {};
      for (const key in el) {
        if (el[key]._text) {
          aux[key] = el[key]._text;
        } else {
          aux[key] = null;
        }
        if (key === "_attributes") {
          aux["pageid"] = el[key]["id"];
        }
        if (key === "tools") {
          aux["tools"] = el[key]["tool"];

          let auxTools: { [index: string]: any } = {};
          for (const keyTools in aux["tools"]) {
            if (aux["tools"][keyTools]._text) {
              auxTools[keyTools] = aux["tools"][keyTools]._text;
            } else if (keyTools === "_attributes") {
              auxTools["toolid"] = aux["tools"][keyTools]["id"];
            } else {
              auxTools[keyTools] = aux["tools"][keyTools];
            }
            // else{
            //   auxTools[keyTools] = aux['tools'][keyTools]._text ? aux['tools'][keyTools]._text : null;
            // }
          }

          aux["tools"] = auxTools;
        }
      }
      return aux;
    });

    console.log(list);

    return [];
  }
}
