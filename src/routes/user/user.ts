
export interface IUser {
  id?: string;
  email: string;
  username?: string;
  password?: string;
  role?: string;
  status?: string;

  bio?: string;
  firstname: string;
  lastname: string;
  avatar: string;
  phone: string;
  country: string;
  address: string;
  dob: Date;

  resetToken?: string;
  resetTokenSentAt?: Date;
  resetTokenExpireAt?: Date;

  activationToken?: string;
  activationTokenExpireAt?: Date;
}