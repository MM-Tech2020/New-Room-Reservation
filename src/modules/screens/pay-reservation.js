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
import { State, confirmReservation, loadDefaultPlayground } from "../../state";
import { PlaygroundDto, ReservationDto } from "../../proxy/dtos/classes";
import { FooterComponent } from "../components";

class PayReservationContainer extends Component {
  constructor() {
    super();
  }
  static mapStateToProps(state: State) {
    return {
      currentReservation: state.selectedPlayground.currentReservation
    };
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ loadDefaultPlayground }, dispatch);
  }
  //---------------------------------------------

  props: {
    currentReservation: ReservationDto,
    loadDefaultPlayground: () => void
  };

  render() {
    console.log(this.props.currentReservation);
    return (
      <Container>
        <Content>
          <Form>
            <Button
              full
              success
              rounded
              onPress={() => {
                // this.props.confirmReservation(this.state);
                // console.log(this.state);
                // this.props.navigation.navigate('PlaygroundsScreen');
              }}
            >
              <Text>Pay</Text>
            </Button>
          </Form>
        </Content>
        <FooterComponent
          navigation={this.props.navigation}
          homeActive={false}
          myReservationsActive={false}
        />
      </Container>
    );
  }
}

export const PayReservationScreen = connect(
  PayReservationContainer.mapStateToProps,
  PayReservationContainer.mapDispatchToProps
)(PayReservationContainer);
