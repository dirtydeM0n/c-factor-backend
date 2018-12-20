export type AuthToken = {
  accessToken: string,
  kind: string
};

export interface IProfile {
  info?: string;
  firstname: string;
  lastname: string;
  country: string;
  address: string;
  phone: string;
  dob: string;
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