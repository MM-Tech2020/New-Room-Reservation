import React, { Component } from 'react';

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  Button,
  Item,
  Input,
  Form,
  Label,
  View
} from 'native-base';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { State } from '../../state';
import { tryLogin } from '../../state/authorization/action-creators';
import { UserLoginModel } from '../../proxy/models';
import { LoginForm } from '../components';
class loginContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      loginError: state.authorization.errorMessage,
      loading: state.authorization.loading,
      isLoggedIn: state.authorization.isLoggedIn
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ tryLogin }, dispatch);
  }

  props: {
    loginError: string,
    loading: boolean,
    isLoggedIn: boolean,
    tryLogin: (userModel: UserLoginModel) => void
  };

  render() {
    return (
      <LoginForm
        loading={this.props.loading}
        tryLogin={this.props.tryLogin}
        errorMessage={this.props.loginError}
        isLoggedIn={this.props.isLoggedIn}
        navigation={this.props.navigation}
      />
    );
  }
}

export const LoginScreen = connect(
  loginContainer.mapStateToProps,
  loginContainer.mapDispatchToProps
)(loginContainer);
