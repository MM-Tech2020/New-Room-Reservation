import React, { Component } from "react";
import { ShareContent, Share } from "react-native";
import {
  Container,
  Button,
  Icon,
  Text,
  Label,
  Content,
  Card,
  CardItem,
  Spinner,
  Form,
  Input,
  Item
} from "native-base";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  State,
  reservePlayground,
  ratePlayground,
  cancelReservation
} from "../../state";
import { PlaygroundDto, ReservationDto } from "../../proxy/dtos/classes";
import * as _ from "lodash";
import { FooterComponent } from "../components";

class ViewReservationContainer extends Component {
  static mapStateToProps(state: State) {
    return {
      reservation: state.data.myReservations[state.data.currentReservationId],
      loading: state.selectedPlayground.loading
    };
  }
  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({ ratePlayground, cancelReservation }, dispatch);
  }

  constructor() {
    super();
    this.state = {
      textComment: "",
      rate: 0
    };
  }
  props: {
    reservation: ReservationDto,
    loading: boolean,
    ratePlayground: (rate: any) => void,
    cancelReservation: (id: int) => void
  };

  rate(value) {
    this.setState({ rate: value });
    console.log(value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading === false) {
      nextProps.navigation.navigate("HomeScreen");
    }
  }
  render() {
    var loadingPanel = this.props.loading ? (
      <Spinner />
    ) : (
      <Button
        full
        success
        rounded
        onPress={() => {
          this.props.ratePlayground(this.state);
        }}
      >
        <Text>Comment</Text>
      </Button>
    );
    var comment =
      new Date(this.props.reservation.date) < Date.now() ? (
        <Form>
          <Item floatingLable>
            <Label>Rating</Label>
            <Icon
              name="football"
              style={{ color: this.state.rate < 1 ? "black" : "green" }}
              onPress={() => {
                this.rate(1);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 2 ? "black" : "green" }}
              onPress={() => {
                this.rate(2);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 3 ? "black" : "green" }}
              onPress={() => {
                this.rate(3);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 4 ? "black" : "green" }}
              onPress={() => {
                this.rate(4);
              }}
            />
            <Icon
              name="football"
              style={{ color: this.state.rate < 5 ? "black" : "green" }}
              onPress={() => {
                this.rate(5);
              }}
            />
          </Item>
          <Item floatingLable>
            <Label>Comment</Label>
            <Input
              onChangeText={txt => {
                this.setState({
                  textComment: txt
                });
              }}
            />
          </Item>
          {loadingPanel}
        </Form>
      ) : (
        <>
          <Button
            full
            iconRight
            success
            rounded
            style={{ margin: 2 }}
            onPress={() => {
              this.props.cancelReservation(this.props.reservation.id);
              this.props.navigation.navigate("HomeScreen");
            }}
          >
            <Icon name="trash" />
            <Text>Cancel</Text>
          </Button>
          <Button
            full
            iconRight
            success
            rounded
            style={{ margin: 2 }}
            onPress={() => {
              Share.share({
                title: "Reservation Number",
                message: `Reservation Number: ${this.props.reservation.id}`,
                url: " "
              });
            }}
          >
            <Icon name="share" />
            <Text>Share</Text>
          </Button>
        </>
      );
    return (
      <Container>
        <Content>
          {this.props.reservation ? (
            <Card>
              <CardItem header>
                <Text>
                  Reservation Number:{"\t"}
                  {this.props.reservation.id}
                  {"\n"}Date:{"\t"}
                  {this.props.reservation.date.split(" ")[0]}
                  {"\t"}
                  {this.props.reservation.reservationDetails.hour >= 12
                    ? `${
                        this.props.reservation.reservationDetails.hour - 12 == 0
                          ? 12 + " AM"
                          : this.props.reservation.reservationDetails.hour -
                            12 +
                            " PM"
                      }`
                    : `${this.props.reservation.reservationDetails.hour} AM`}
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  Playground Name:{"\t"}
                  {this.props.reservation.playground.name}
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  Paid amount:{"\t"}
                  {this.props.reservation.reservationDetails.paid}
                </Text>
              </CardItem>
              <CardItem footer>
                <Text>
                  Total price:{"\t"}
                  {this.props.reservation.reservationDetails.totalPrice}
                </Text>
              </CardItem>
            </Card>
          ) : (
            <Spinner color={"green"} />
          )}
          {comment}
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

export const ViewReservationScreen = connect(
  ViewReservationContainer.mapStateToProps,
  ViewReservationContainer.mapDispatchToProps
)(ViewReservationContainer);
