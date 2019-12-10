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

import { UserConfirmModel } from "../../proxy/models";

export class ConfirmForm extends Component {
  constructor() {
    super();
    this.state = {
      pin: ""
    };
  }

  props: {
    isConfirmed: boolean,
    loading: boolean,
    errorMessage: string,
    navigation: any,
    tryConfirm: (userConfirmModel: UserConfirmModel) => void
  };

  render() {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );

    const loadingSpinner = this.props.loading ? (
      <Spinner color="blue" />
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
            style={{ flex: 1, alignSelf: "center" }}
            source={require("../../themes/imgs/icon.png")}
          />
          <View
            style={{
              flex: 1
            }}
          >
            <Form style={{ padding: 20 }}>
              <Item floatingLabel>
                <Label>PIN</Label>
                <Input
                  onChangeText={txt => {
                    this.setState({ pin: txt });
                  }}
                />
              </Item>

              <Button
                full
                onPress={() => {
                  this.props.tryConfirm(this.state);
                }}
              >
                <Text>Confirm</Text>
              </Button>
            </Form>
            {loadingSpinner}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
