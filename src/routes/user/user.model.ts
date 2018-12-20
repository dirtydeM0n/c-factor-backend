import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import * as util from 'util';
import { IUser, AuthToken, IProfile } from './user';

export type UserType = mongoose.Document & {

  email: string,
  username: string,
  password: string,
  role: string,

  active: boolean,

  passwordResetToken: string,
  passwordResetExpires: Date,

  activationToken: string,
  activationExpires: Date,

  tokens: Array<AuthToken>,

  profile: IProfile,

  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void
};

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  role: String,

  active: Boolean,

  passwordResetToken: String,
  passwordResetExpires: Date,

  activationToken: String,
  activationExpires: Date,

  profile: {
    firstname: String,
    lastname: String,
    info: String,
    country: String,
    address: String,
    phone: String,
    dob: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  const qCompare = (util as any).promisify(bcrypt.compare);
  return qCompare(candidatePassword, this.password);
};

type UserType = IUser & mongoose.Document;

const UserModel = mongoose.model<UserType>('User', UserSchema);
export default UserModel;