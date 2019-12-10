import { TokenDto } from '../../proxy';

export interface AuthorizationState {
  token: TokenDto;
  isLoggedIn: boolean;
  errorMessage: string;
  loading: boolean;
  userEmail: string;
  companyName: string;
  companyAddress: string;
  name: string;
  isRegistered: boolean;
}

export const AuthorizationInitialState: AuthorizationState = {
  token: null,
  isLoggedIn: false,
  errorMessage: '',
  loading: false,
  userEmail: '',
  companyName: '',
  companyAddress: '',
  name: '',
  isRegistered: false
};
