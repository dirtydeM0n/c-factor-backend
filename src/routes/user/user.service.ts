import * as bcrypt from 'bcrypt-nodejs';
import * as util from 'util';
import { User } from './user.model';
import { IUser } from './user';

/**
 * @class UserService
 */
class UserService {

  /**
   * @description Fetches single user from the storage by email
   * @param email
   * @returns {Promise<IUser>}
   */
  async findByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({
      where: {
        email: email,
      }
    });
    return user;
  }

  /**
   * @description Fetches single user from the storage by email or username
   * @param username
   * @param email
   * @returns {Promise<IUser>}
   */
  async findByUsernameOrEmail(username, email): Promise<IUser> {
    const user: IUser = await User.findOne({ where: { $or: [{ email: email }, { username: username }] } });
    return user;
  }

  /**
   * @description Saves the user in the storage
   * @param {User} user
   * @returns {Promise<IUser>}
   */
  async save(user: IUser): Promise<IUser> {
    const new_user = await User.create({ ...user });
    return new_user;
  }

  /**
   * @description Fetches single user by activationToken and sets active flag
   * @param activationToken
   * @returns {Promise<IUser>}
   */
  async findOneAndUpdate(findObj = {}, updateObj = {}): Promise<IUser> {
    const user: IUser = await User.update({ ...updateObj }, { where: { ...findObj } });
    return user;
  }

  /**
   * @description Fetches single user from storage
   * @param Object
   * @returns {Promise<IUser>}
   */
  async findOne(findObj = {}): Promise<IUser> {
    const user: IUser = await User.findOne({ where: { ...findObj } });
    return user;
  }

  /**
   * @description Fetches all users from the storage
   * @returns {Promise<IUser[]>}
   */
  async findAll(): Promise<IUser[]> {
    return await User.findAll({}) as IUser[];
  }

  /**
   * @description Deletes a single user from storage
   * @returns {Promise<void>}
   */
  async delete(obj = {}): Promise<void> {
    return await User.destroy({ where: { ...obj } });
  }

  /**
   * @description Deletes a single user from storage
   * @returns {Promise<void>}
   */
  async deleteByEmail(email: string): Promise<void> {
    return await User.destroy({ where: { email: email } });
  }

  /**
   * @description Deletes a single user from storage
   * @returns {Promise<void>}
   */
  async deleteByUsername(username: string): Promise<void> {
    return await User.destroy({ where: { username: username } });
  }

  /**
   * @description Deletes a single user from storage
   * @returns {Promise<void>}
   */
  async deleteById(id: string): Promise<void> {
    return await User.destroy({ where: { id: id } });
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