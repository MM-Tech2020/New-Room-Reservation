import React, { Component } from "react";
import {
  Footer,
  FooterTab,
  Container,
  Header,
  Button,
  Icon,
  Body,
  Right,
  Left,
  Title,
  SubTitle,
  Text,
  Label,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Image,
  View
} from "native-base";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//----------------------------------------
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import * as _ from "lodash";
import { State, getMyReservations, setCurrentReservation } from "../../state";
import { ReservationDto } from "../../proxy/dtos/classes";
import { FooterComponent } from "../components";

class MyReservationsContainer extends Component {
  static mapStateToProps(state: State) {
    var sortedReservations = _.orderBy(
      state.data.myReservations,
      ["date", "reservationDetails.hour"],
      ["desc", "desc"]
    );
    console.log("reservations");
    console.log(sortedReservations);
    return {
      myReservations: sortedReservations
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      { getMyReservations, setCurrentReservation },
      dispatch
    );
  }
  //------------------------------------------
  props: {
    myReservations: ReservationDto[],
    setCurrentReservation: (id: number) => void,
    getMyReservations: () => void
  };

  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "My Reservations"
    };
  };
  componentDidMount() {
    this.props.getMyReservations();
  }
  render() {
    return (
      <Container>
        <Content>
          <List style={{ flex: 1 }}>
            <ScrollView>
              {_.map(this.props.myReservations, (res, key) => {
                const btn = <Text>View Details</Text>;
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
                        style={{ padding: 30, alignContent: "space-between" }}
                      >
                        <Text style={{ alignSelf: "center" }}>
                          {res.date.split(" ")[0]}
                        </Text>
                        <Text style={{ alignSelf: "center" }} note>
                          {res.reservationDetails.hour >= 12
                            ? `${
                                res.reservationDetails.hour - 12 == 0
                                  ? 12 + " AM"
                                  : res.reservationDetails.hour - 12 + " PM"
                              }`
                            : `${res.reservationDetails.hour} AM`}
                        </Text>
                        <Text style={{ alignSelf: "center" }}>
                          {"Price:"} {`${res.reservationDetails.totalPrice} LE`}
                        </Text>
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
                            this.props.setCurrentReservation(res.id);
                            this.props.navigation.navigate("ViewReservation");
                          }}
                        >
                          {btn}
                        </Button>
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
          myReservationsActive={true}
        />
      </Container>
    );
  }
}

export const MyReservationsScreen = connect(
  MyReservationsContainer.mapStateToProps,
  MyReservationsContainer.mapDispatchToProps
)(MyReservationsContainer);
