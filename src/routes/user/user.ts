export type AuthToken = {
  accessToken: string,
  kind: string
};

export interface IProfile {
  info: string;
  fname: string;
  lname: string;
}

export interface IUser {

  email?: string;
  username?: string;
  password?: string;
  role?: string;

  active?: boolean;

  passwordResetToken?: string;
  passwordResetExpires?: Date;

  activationToken?: string;
  activationExpires?: Date;

  tokens?: Array<AuthToken>;

  profile?: IProfile;
}