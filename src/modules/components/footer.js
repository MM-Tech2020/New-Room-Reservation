import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text, Thumbnail } from "native-base";

export class FooterComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={this.props.homeActive}
            onPress={() => {
              this.props.navigation.navigate("HomeScreen");
            }}
          >
            <Icon name="home" />
            <Text
              style={{
                fontSize: 8,
                alignContent: "center",
                alignItems: "center"
              }}
            >
              Home
            </Text>
          </Button>

          <Thumbnail
            small
            circular
            style={{
              alignSelf: "center",
              width: 80,
              height: 80,
              marginTop: -45
            }}
            source={require("../../../assets/icon.png")}
          />

          <Button
            active={this.props.myReservationsActive}
            onPress={() => {
              this.props.navigation.navigate("MyReservations");
            }}
          >
            <Icon name="paper" />
            <Text
              style={{
                fontSize: 8,
                alignContent: "center",
                alignItems: "center"
              }}
            >
              My Reservations
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
