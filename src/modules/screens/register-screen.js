import React, { Component } from "react";

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
  Label
} from "native-base";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { State } from "../../state";
import {
  tryRegister,
  tryConfirm
} from "../../state/authorization/action-creators";
import { UserRegisterModel, UserConfirmModel } from "../../proxy/models";
import { RegisterForm, ConfirmForm } from "../components";

class RegisterContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      registerError: state.authorization.errorMessage,
      loading: state.authorization.loading,
      isRegistered: state.authorization.isRegistered,
      isConfirmed: state.authorization.isLoggedIn
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        tryRegister,
        tryConfirm
      },
      dispatch
    );
  }

  props: {
    registerError: string,
    loading: boolean,
    isRegistered: boolean,
    isConfirmed: boolean,
    tryRegister: (user: UserRegisterModel) => void,
    tryConfirm: (user: UserConfirmModel) => void
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isConfirmed) {
      nextProps.navigation.navigate("HomeScreen");
    }
  }

  render() {
    console.log();
    var form = this.props.isRegistered ? (
      <ConfirmForm
        tryConfirm={this.props.tryConfirm}
        errorMessage={this.props.registerError}
        isConfirmed={this.props.isConfirmed}
        loading={this.props.loading}
        navigation={this.props.navigation}
      />
    ) : (
      <RegisterForm
        loading={this.props.loading}
        tryRegister={this.props.tryRegister}
        errorMessage={this.props.registerError}
        isRegistered={this.props.isRegistered}
        navigation={this.props.navigation}
      />
    );
    return <Container>{form}</Container>;
  }
}

export const RegisterScreen = connect(
  RegisterContainer.mapStateToProps,
  RegisterContainer.mapDispatchToProps
)(RegisterContainer);
