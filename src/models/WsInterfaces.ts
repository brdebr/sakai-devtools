// Params

export interface LoginParams {
  id: String;
  pw: String;
}

export interface sessionIdParam {
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

export interface getUserPropertyParams {
  eid: String;
  propertyName: String;
}

export interface setUserPropertyParams {
  eid: String;
  key: String;
  value: String;
}

export interface siteParams {
  siteid: String | undefined;
  title: String;
  description: String;
  shortdesc: String;
  iconurl: String;
  infourl: String;
  joinable: boolean;
  joinerrole: String;
  published: boolean;
  publicview: boolean;
  skin: String;
  type: "project" | "course";
}

// Responses
export interface userResponse {
  displayName: String;
  eid: String;
  type: String | null;
  userId: String;
}

export interface SiteItemList {
  siteId: String;
  siteTitle: String;
  siteType?: String;
  siteGroups?: Number;
}

export type getAllSitesForCurrentUserResponse = Array<SiteItemList>;

export interface getUserPropertyResponse {
  value: String;
}

// Others

export interface UserProperty {
  key: String;
  type: "Number" | "Text" | "Date";
  fakeSelect: String;
}

export interface getServerPropertyParams {
  propName: String;
}

export interface getServerPropertyResponse {
  propName: String;
}

export interface setServerPropertyParams {
  propName: String;
  propType: "boolean" | "string" | "int" | "array";
  propValue: String;
}

export interface setServerPropertyResponse {
  propName: String;
}
