import { BASE_URL } from '../../services/http-client/constants';
import {
  UserRegisterModel,
  UserLoginModel,
  UserConfirmModel
} from '../models/index';

export class AuthProxyService {
  async login(user: UserLoginModel) {
    const data = `grant_type=password&username=${user.username}&password=${
      user.password
    }&client_id=1&client_secret=p@$$w0rd`;
    return await fetch(`${BASE_URL}/token`, {
      method: 'post',
      headers: { 'content-Type': 'application/x-www-form-urlencoded' },
      body: data
    });
  }

  async register(user: UserRegisterModel) {
    const data = `grant_type=register&mobile=${user.mobile}&password=${
      user.password
    }&fullname=${user.fullName}&identification=${
      user.identification
    }&client_id=1&client_secret=p@$$w0rd`;
    return await fetch(`${BASE_URL}/token`, {
      method: 'post',
      headers: { 'content-Type': 'application/x-www-form-urlencoded' },
      body: data
    });
  }

  async confirm(user: UserConfirmModel) {
    const data = `grant_type=confirm&membershipid=${user.membershipId}&mobile=${
      user.mobile
    }&pin=${user.pin}&client_id=1&client_secret=p@$$w0rd`;
    return await fetch(`${BASE_URL}/token`, {
      method: 'post',
      headers: { 'content-Type': 'application/x-www-form-urlencoded' },
      body: data
    });
  }
}
