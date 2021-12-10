export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  __v: number;
}

export interface IUserDto {
  id: string;
  username: string;
  email: string;
  isActivated: boolean;
}
