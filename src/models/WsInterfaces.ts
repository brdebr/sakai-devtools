
// Params

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
