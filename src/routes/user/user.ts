
export interface IUser {
  id?: string;
  email: string;
  username?: string;
  password?: string;
  role?: string;
  status?: string;
  resetToken?: string;
  resetTokenSentAt?: Date;
  resetTokenExpireAt?: Date;
  activationToken?: string;
  activationTokenExpireAt?: Date;

  avatar: {
    gender?: string;
    width?: string;
    height?: string;
    color?: string;
  };

  profile: {
    bio?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    dob?: Date;
    education: string;
    specialization?: string;
    city?: string;
    region?: string;
    country?: string;
  };
}