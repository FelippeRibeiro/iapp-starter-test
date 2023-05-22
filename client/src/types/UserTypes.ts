export interface IUser {
  name: string;
}

export interface ICreateUser {
  name: string;
  document: string;
  password: string;
}

export interface IUserLogin {
  document: string;
  password: string;
}
