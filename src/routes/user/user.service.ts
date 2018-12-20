import { IUser } from './user';
import * as bcrypt from 'bcrypt-nodejs';
import * as util from 'util';
import UserModel, { UserType } from './user.model';

/**
 * @class UserService
 */
class UserService {

  /**
   * @description Fetches single user from the storage by email
   * @param email
   * @returns {Promise<IUser>}
   */
  async findByEmail(email): Promise<IUser> {
    const user: UserType = await UserModel.findOne({email: email});
    return user;
  }

  /**
   * @description Fetches single user from the storage by email or username
   * @param username
   * @param email
   * @returns {Promise<IUser>}
   */
  async findByUsernameOrEmail(username, email): Promise<IUser> {
    const user: IUser = await UserModel.findOne({$or: [{email: email}, {username: username}]});
    return user;
  }

  /**
   * @description Saves the user in the storage
   * @param {User} user
   * @returns {Promise<IUser>}
   */
  async save(user: IUser): Promise<IUser> {
    return (await new UserModel(user).save()).toObject({ virtuals: true });
  }

  /**
   * @description Fetches single user by activationToken and sets active flag
   * @param activationToken
   * @returns {Promise<IUser>}
   */
  async findOneAndUpdate(activationToken): Promise<IUser> {
    const user: IUser = await UserModel.findOneAndUpdate({activationToken: activationToken}, {active: true}, {new: true});
    return user;
  }

  /**
   * @description Fetches all users from the storage
   * @returns {Promise<IUser[]>}
   */
  async findAll(): Promise<IUser[]> {
    return await UserModel.find() as IUser[];
  }

  /**
   * @description Deletes a single user from storage
   * @returns {Promise<void>}
   */
  async deleteOne(email: string): Promise<void> {
    return await UserModel.deleteOne({email: email});
  }

  /**
   * @description Compares encrypted and decrypted passwords
   * @param {string} candidatePassword
   * @param storedPassword
   * @returns {boolean}
   */
  comparePassword(candidatePassword: string, storedPassword): boolean {
    const qCompare = (util as any).promisify(bcrypt.compare);
    return qCompare(candidatePassword, storedPassword);
  }
}

export default new UserService();