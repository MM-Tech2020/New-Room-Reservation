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
  Label,
  Picker
} from "native-base";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { State, confirmReservation, loadDefaultPlayground } from "../../state";
import { PlaygroundDto, ReservationDto } from "../../proxy/dtos/classes";
import { FooterComponent } from "../components";

class ConfirmReservationContainer extends Component {
  constructor() {
    super();
    this.state = {
      paymentType: "Credit Card",
      cardNumber: "",
      walletNumber: "",
      userFullName: "",
      paidAmount: 0,
      duration: 1
    };
  }

  static mapStateToProps(state: State) {
    return {
      selectedPlayground: state.selectedPlayground.current,
      selectedHour: state.selectedPlayground.selectedHour,
      currentReservation: state.selectedPlayground.currentReservation
    };
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        confirmReservation,
        loadDefaultPlayground
      },
      dispatch
    );
  }
  //--------------------------------------

  props: {
    selectedPlayground: PlaygroundDto,
    selectedHour: number,
    currentReservation: ReservationDto,
    confirmReservation: reservationModel => void,
    loadDefaultPlayground: () => void
  };
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Confirm Reservation"
    };
  };
  onPaymentChange(value: string) {
    this.setState({
      paymentType: value
    });
  }
  render() {
    console.log(this.state.paymentType);
    console.log(this.props.currentReservation);
    var paymentValues =
      this.state.paymentType == "Credit Card" ? (
        <Item floatingLable>
          <Label>Card no.</Label>
          <Input
            onChangeText={txt => {
              this.setState({
                cardNumber: txt
              });
            }}
          />
        </Item>
      ) : (
        <Item floatingLable>
          <Label>Wallet no.</Label>
          <Input
            onChangeText={txt => {
              this.setState({
                walletNumber: txt
              });
            }}
          />
        </Item>
      );
    return (
      <Container>
        <Content>
          <Form>
            {/* <Item floatingLable>
              <Label>Amount</Label>
              <Input
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    paidAmount: parseFloat(txt)
                  });
                }}
              />
            </Item> */}
            <Item floatingLable>
              <Label>Duration</Label>
              <Input
                // defaultValue={this.state.duration.toString()}
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({
                    duration: parseFloat(txt)
                  });
                }}
              />
            </Item>
            {/* <Picker
              iosHeader="Select Payment Method"
              mode="dropdown"
              placeholder="Select Payment Method"
              selectedValue={this.state.paymentType}
              onValueChange={this.onPaymentChange.bind(this)}
            >
              <Item label="Credit Card" value="Credit Card" />
              <Item label="Mobile Wallet" value="Mobile Wallet" />
            </Picker>
            {paymentValues} */}
            {/* <Item floatingLable>
              <Label>Total Price</Label>
              <Label>
                {console.log(this.props.selectedHour)}
                {this.state.duration *
                  (this.props.selectedHour >
                    this.props.selectedPlayground.switchingHour &&
                  this.props.selectedHour <
                    this.props.selectedPlayground.switchingHour + 12
                    ? this.props.selectedPlayground.morningPrice
                    : this.props.selectedPlayground.nightPrice)}
              </Label>
            </Item> */}

            <Button
              success
              rounded
              onPress={() => {
                this.props.confirmReservation(this.state);
                this.props.navigation.navigate("HomeScreen");
                console.log(this.state);
              }}
              style={{ width: 150, alignSelf: "center" }}
            >
              <Text style={{ marginLeft: 35 }}>Reserve</Text>
            </Button>
          </Form>
        </Content>

        <FooterComponent
          navigation={this.props.navigation}
          homeActive={false}
          myReservarionsActive={false}
        />
      </Container>
    );
  }
}

export const confirmReservationScreen = connect(
  ConfirmReservationContainer.mapStateToProps,
  ConfirmReservationContainer.mapDispatchToProps
)(ConfirmReservationContainer);
