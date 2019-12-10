import { AnyAction } from 'redux';

import { AuthorizationState, AuthorizationInitialState } from './state';
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

export function authorizationReducer(
  state: AuthorizationState = AuthorizationInitialState,
  action: AnyAction
): AuthorizationState {
  switch (action.type) {
    case TRY_REGISTER: {
      return {
        ...state,
        loading: true,
        userEmail: action.payload.username
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        token: action.payload,
        userEmail: action.payload.name,
        isRegistered: true,
        errorMessage: '',
        loading: false,
        name: action.payload.fullName
      };
    }

    case REGISTER_FAILD: {
      return {
        ...state,
        isRegistered: false,
        errorMessage: action.payload,
        loading: false
      };
    }

    case TRY_CONFIRM: {
      return {
        ...state,
        loading: true,
        userEmail: action.payload.username
      };
    }

    case CONFIRM_SUCCESS: {
      return {
        ...state,
        token: action.payload,
        userEmail: action.payload.name,
        isLoggedIn: true,
        errorMessage: '',
        loading: false,
        name: action.payload.fullName
      };
    }

    case CONFIRM_FAILD: {
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
        isLoggedIn: false
      };
    }

    case TRY_LOGIN: {
      return {
        ...state,
        loading: true,
        userEmail: action.payload.username
      };
    }

    case LOGIN_SUCCEESS: {
      return {
        ...state,
        token: action.payload,
        userEmail: action.payload.name,
        isLoggedIn: true,
        errorMessage: '',
        loading: false,
        name: action.payload.fullName
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: action.payload,
        loading: false
      };
    }

    case LOGOUT: {
      return AuthorizationInitialState;
    }
    default:
      return state;
  }
}
