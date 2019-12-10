import React, { Component } from "react";
import { Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  View,
  Thumbnail,
  Text,
  Button,
  Spinner,
  Label
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { UserRegisterModel } from "../../proxy/models";

export class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      mobile: "",
      password: "",
      confirtPassword: "",
      fullName: "",
      identification: ""
    };
  }

  props: {
    isRegistered: boolean,
    loading: boolean,
    errorMessage: string,
    navigation: any,
    tryRegister: UserRegisterModel => void
  };

  render() {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );

    const loadingSpinner = this.props.loading ? (
      <Spinner color="green" />
    ) : (
      <Text bold red margin20>
        {" "}
        {this.props.errorMessage}
      </Text>
    );

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          height: screenHeight
        }}
      >
        <KeyboardAwareScrollView>
          <Thumbnail
            large
            square
            style={{
              flex: 1,
              alignSelf: "center",
              width: screenWidth / 2,
              height: screenHeight / 5.8
            }}
            source={require("../../themes/imgs/login-logo.png")}
          />
          <View
            style={{
              flex: 1
            }}
          >
            <Form style={{ padding: 20 }}>
              <Item floatingLabel>
                <Label>Mobile no. </Label>
                <Input
                  onChangeText={txt => {
                    this.setState({ mobile: txt });
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password </Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={txt => {
                    this.setState({ password: txt });
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Confirm Password </Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={txt => {
                    this.setState({ confirmPassword: txt });
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Full name </Label>
                <Input
                  onChangeText={txt => {
                    this.setState({ fullName: txt });
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Identification </Label>
                <Input
                  onChangeText={txt => {
                    this.setState({ identification: txt });
                  }}
                />
              </Item>
              <Button
                full
                success
                rounded
                style={{ marginTop: 20 }}
                onPress={() => {
                  this.props.tryRegister(this.state);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    alignContent: "center",
                    color: "white"
                  }}
                >
                  Register
                </Text>
              </Button>
            </Form>
            {loadingSpinner}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
