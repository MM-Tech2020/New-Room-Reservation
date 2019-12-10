import React, { Component } from "react";
import {
  List,
  Footer,
  FooterTab,
  ListItem,
  Text,
  Button,
  Body,
  Container,
  Content,
  View,
  Left,
  Right,
  Icon
} from "native-base";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
  State,
  selectReservationHour,
  getReservationDetails
} from "../../state";
import { ReservationDto, PlaygroundDto } from "../../proxy/dtos/classes";

import * as _ from "lodash";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FooterComponent } from "../components";

class ReservationsListContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      playground: state.selectedPlayground.current,
      reservedHours: state.selectedPlayground.reservedHours
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        selectReservationHour,
        getReservationDetails
      },
      dispatch
    );
  }
  props: {
    reservedHours: ReservationDto[],
    playground: PlaygroundDto,
    selectReservationHour: (hour: number) => void,
    getReservationDetails: (reservationId: number) => void
  };
  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Available Hours"
    };
  };

  dayHours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24
  ];

  render() {
    // const hours = _.map(this.dayHours, dH => {
    //   let out = _.filter(
    //     this.props.reservations.reservationHours,
    //     r => r.hour == dH
    //   );
    //   if (out.length != 0) {
    //     return {
    //       date: this.props.reservations.date,
    //       payment: out[0].payment,
    //       hour: dH
    //     };
    //   }
    //   return {
    //     date: this.props.reservations.date
    //   };
    // });
    // const hours = _.filter(this.dayHours, h =>
    //   _.find(
    //     this.props.reservedHours,
    //     (hour: ReservationDto) => hour.reservationDetails.hour == h
    //   )
    // );
    var hours = this.dayHours;
    // this.props.reservedHours.forEach((reservation: ReservationDto) => {
    //   // hours = _.remove(hours, h => h == reservation.reservationDetails.hour);
    //   hours[reservation.reservationDetails.hour - 1] = reservation;
    // });
    _.forEach(this.props.reservedHours, reservation => {
      hours[reservation.reservationDetails.hour - 1] = reservation;
    });
    // hours = _.filter(hours, h => h.reservationDetails == null);
    console.log(hours);
    return (
      <Container>
        <Content>
          <List style={{ flex: 1 }}>
            <ScrollView>
              {_.map(hours, (res, key) => {
                console.log(res);
                const btn = res.reservationDetails ? (
                  <Button
                    full
                    rounded
                    success
                    style={{
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 20
                    }}
                    onPress={() => {
                      console.log(res.id);
                      this.props.getReservationDetails(res.id);
                      this.props.navigation.navigate("ViewOtherReservation");
                    }}
                  >
                    <Text>View</Text>
                  </Button>
                ) : (
                  <Button
                    full
                    rounded
                    success
                    style={{
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 20
                    }}
                    onPress={() => {
                      this.props.selectReservationHour(res);
                      console.log("Reserve");
                      this.props.navigation.navigate("ConfirmReservation");
                    }}
                  >
                    <Text>Reserve</Text>
                  </Button>
                );
                return (
                  <ListItem key={key} style={{ minHeight: 150 }}>
                    <ImageBackground
                      source={require("../../themes/imgs/playground-item-bg-noline.png")}
                      style={{
                        flex: 1,
                        minHeight: 150
                      }}
                    >
                      <View
                        style={{ alignContent: "space-between", padding: 30 }}
                      >
                        <Text style={{ alignSelf: "center" }}>
                          {key + 1 >= 12
                            ? `${
                                key + 1 - 12 == 0
                                  ? 12 + " AM"
                                  : key + 1 - 12 + " PM"
                              }`
                            : `${key + 1} AM`}
                        </Text>

                        {/* <Text style={{ alignSelf: "center" }}>Price/Hour</Text>

                        <Text note style={{ alignSelf: "center" }}>
                          {res > this.props.playground.switchingHour &&
                          res <= this.props.playground.switchingHour + 12
                            ? `${this.props.playground.morningPrice} LE`
                            : `${this.props.playground.nightPrice} LE`}
                        </Text> */}
                        {btn}
                      </View>
                    </ImageBackground>
                  </ListItem>
                );
              })}
            </ScrollView>
          </List>
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

export const ReservationsList = connect(
  ReservationsListContainer.mapStateToProps,
  ReservationsListContainer.mapDispatchToProps
)(ReservationsListContainer);
