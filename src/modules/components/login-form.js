import React, { Component } from "react";
import { Dimensions, ImageBackground } from "react-native";
import {
  Form,
  Item,
  Input,
  View,
  Thumbnail,
  Text,
  Button,
  Spinner,
  Label,
  Icon
} from "native-base";

import { StackActions, NavigationActions } from "react-navigation";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { UserLoginModel } from "../../proxy/models";

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "01099999999",
      password: "User!11"
    };
  }

  props: {
    isLoggedIn: boolean,
    loading: boolean,
    errorMessage: string,
    navigation: any,
    tryLogin: UserLoginModel => void
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
      });
      this.props.navigation.dispatch(resetAction);
      // nextProps.navigation.navigate("HomeScreen");
    }
  }

  render() {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );

    const loadingSpinner = this.props.loading ? (
      <Spinner color="black" />
    ) : (
      <Text bold black margin20>
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
        <ImageBackground
          source={require("../../themes/imgs/login-background.png")}
          style={{ flex: 1 }}
        >
          {/* <Thumbnail
            source={require("../../../assets/logo.png")}
            large
            square
            style={{
              alignSelf: "center",
              width: 290,
              height: screenHeight / 5.8,
              marginBottom: -25
            }}
          /> */}
          <ImageBackground
            source={require("../../themes/imgs/login-form-backgronud.png")}
            style={{
              flex: 1,
              margin: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                alignContent: "center",
                color: "black",
                fontSize: 30,
                fontWeight: "bold",
                marginTop: 200
              }}
            >
              Sign in
            </Text>
            <KeyboardAwareScrollView>
              <Form
                style={{
                  marginTop: -10,
                  margin: 30
                }}
              >
                <Item floatingLabel style={{ margin: 5 }}>
                  <Icon active name="phone-portrait" />
                  <Label>Mobile Number</Label>
                  <Input
                    disabled={this.props.loading}
                    onChangeText={txt => {
                      this.setState({ username: txt });
                    }}
                  />
                </Item>
                <Item floatingLabel style={{ margin: 5 }}>
                  <Icon active name="lock" />
                  <Label>Password</Label>
                  <Input
                    disabled={this.props.loading}
                    secureTextEntry={true}
                    onChangeText={txt => {
                      this.setState({ password: txt });
                    }}
                  />
                </Item>
                <Button
                  full
                  success
                  rounded
                  disabled={this.props.loading}
                  style={{ marginTop: 20 }}
                  onPress={() => {
                    this.props.tryLogin(this.state);
                  }}
                >
                  <Text>Sign in</Text>
                </Button>
              </Form>
              <Text
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  color: "black"
                }}
                onPress={() => {
                  if (!this.props.loading)
                    this.props.navigation.navigate("RegisterScreen");
                }}
              >
                Don't have account? Sign up
              </Text>
            </KeyboardAwareScrollView>

            {loadingSpinner}
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}
