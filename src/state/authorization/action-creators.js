import { authProxyService, TokenDto } from '../../proxy';
import { HttpClient } from '../../services/http-client/http-client-service';

import {
  UserLoginModel,
  UserRegisterModel,
  UserConfirmModel
} from '../../proxy/models';
import {
  LOGIN_SUCCEESS,
  LOGIN_FAILED,
  TRY_LOGIN,
  LOGOUT,
  CONFIRM_FAILD,
  CONFIRM_SUCCESS,
  REGISTER_FAILD,
  REGISTER_SUCCESS,
  TRY_CONFIRM,
  TRY_REGISTER
} from './actions';
import {
  loadContent,
  getUserContent,
  setCurrentUser,
  getIntialContent,
  State
} from '../';

export async function tryLogin(user: UserLoginModel) {
  let token = null;

  return async dispatch => {
    // try {
    dispatch({
      type: TRY_LOGIN,
      payload: user
    });
    let response = await authProxyService.login(user);
    token = await response.json();
    if (response.status === 200) {
      HttpClient.requestInterceptor.push(request => {
        let _token: TokenDto;
        if (token) _token = token;
        request.headers = Object.assign({}, request.headers, {
          Authorization: `bearer ${_token.access_token}`
        });
        return request;
      });
      dispatch({
        type: LOGIN_SUCCEESS,
        payload: token
      });
    } else {
      console.log(token.error);
      dispatch({
        type: LOGIN_FAILED,
        payload: 'Invalid Username or Password'
      });
    }
    // } catch (err) {
    //   console.log(err);
    //   dispatch({
    //     type: LOGIN_FAILED,
    //     payload: 'Server Error'
    //   });
    // }
  };
}

export async function tryRegister(user: UserRegisterModel) {
  let token = null;
  return async dispatch => {
    // try {
    dispatch({
      type: TRY_REGISTER,
      payload: user
    });
    let response = await authProxyService.register(user);
    token = await response.json();

    if (response.status === 200) {
      // HttpClient.requestInterceptor.push(request => {
      //   let _token: TokenDto;
      //   if (token) _token = token;
      //   request.headers = Object.assign({}, request.headers, {
      //     Authorization: `bearer ${_token.access_token}`
      //   });
      //   return request;
      // });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: token
      });
    } else {
      console.log(token.error);
      dispatch({
        type: REGISTER_FAILD,
        payload: 'Invalid Registration-operation please check your data'
      });
    }
  };
}

export async function tryConfirm(user: UserConfirmModel) {
  let token = null;
  return async (dispatch, getState) => {
    // try {
    const state: State = getState();
    user.membershipId = state.authorization.token.id;
    user.mobile = state.authorization.userEmail;

    dispatch({
      type: TRY_CONFIRM,
      payload: user
    });
    let response = await authProxyService.confirm(user);
    token = await response.json();

    if (response.status === 200) {
      HttpClient.requestInterceptor.push(request => {
        let _token: TokenDto;
        if (token) _token = token;
        request.headers = Object.assign({}, request.headers, {
          Authorization: `bearer ${_token.access_token}`
        });
        return request;
      });
      dispatch({
        type: CONFIRM_SUCCESS,
        payload: token
      });
    } else {
      console.log(token.error);
      dispatch({
        type: CONFIRM_FAILD,
        payload: 'Invalid Username or Password'
      });
    }
  };
}

export async function logOut() {
  return async dispatch => {
    dispatch(await getIntialContent());
    dispatch({
      type: LOGOUT
    });
  };
}
