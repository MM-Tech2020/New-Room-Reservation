import React, { Component } from "react";
import {
  View,
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
  Image
} from "native-base";
import { NavigationStackScreenOptions } from "react-navigation";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { State, reservePlayground } from "../../state";
import { PlaygroundDto } from "../../proxy/dtos/classes";
import * as _ from "lodash";

class PitchScreenContainer extends Component {
  constructor() {
    super();
    var date = new Date();
    console.log(date.toISOString().split("T")[0]);
    this.state = {
      selectedDate: date.toISOString().split("T")[0],
      minDate: date.toISOString().split("T")[0]
    };
  }
  static mapStateToProps(state: State) {
    return {
      playground: state.selectedPlayground.current
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        reservePlayground
      },
      dispatch
    );
  }
  // -----------------------------------------------------
  props: {
    playground: PlaygroundDto,
    reservePlayground: (date: string) => void
  };

  static navigationOptions = ({ navigation, state }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.title
    };
  };

  render() {
    // const reservationDates = _.map(this.props.playground.reservations, r => {
    //   return { date: r.date, marked: true };
    // });
    // let markedDates = _.keyBy(_.uniq(reservationDates), r => r.date);
    // console.log(markedDates);
    // if (this.state.selectedDate) {
    //   if (markedDates[this.state.selectedDate])
    //     markedDates[this.state.selectedDate].selected = true;
    //   else markedDates[this.state.selectedDate] = { selected: true };
    // }
    var selectedDate = this.state.selectedDate
      ? {
          [this.state.selectedDate]: { selected: true }
        }
      : null;

    return (
      <Container>
        <Content>
          <Card
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <CardItem cardBody style={{}}>
              <Thumbnail
                source={{
                  uri:
                    "https://image.shutterstock.com/z/stock-photo-business-people-discussing-together-in-conference-room-during-meeting-at-office-1499996621.jpg"
                }}
                style={{ height: 100, width: null, flex: 1 }}
                square
              />
            </CardItem>
            <CardItem
              cardBody
              style={{ flexDirection: "column", alignContent: "space-between" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="projector"
                  type="MaterialCommunityIcons"
                  style={{ padding: 4 }}
                />
                <Icon name="hdd" type="AntDesign" style={{ padding: 4 }} />
                <Icon name="chair" type="FontAwesome5" style={{ padding: 4 }} />
                <Icon name="wifi" style={{ padding: 4 }} />
              </View>
              <Calendar
                minDate={this.state.minDate}
                markedDates={selectedDate}
                onDayPress={day => {
                  console.log("selected day", day.dateString);
                  this.setState({ selectedDate: day.dateString });
                }}
              />
              <Button
                full
                success
                rounded
                style={{
                  marginLeft: 20,
                  marginRight: 20
                }}
                onPress={() => {
                  console.log("Reserve");
                  this.props.reservePlayground(this.state.selectedDate);
                  this.props.navigation.navigate("ReservationsList");
                }}
              >
                <Text>Reserve</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                this.props.navigation.navigate("HomeScreen");
              }}
            >
              <Text>Home</Text>
            </Button>
            <Button
              onPress={() => {
                console.log("Reserve");
                this.props.reservePlayground(this.state.selectedDate);
                this.props.navigation.navigate("ReservationsList");
              }}
            >
              <Text>My Reservations</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export const PitchScreen = connect(
  PitchScreenContainer.mapStateToProps,
  PitchScreenContainer.mapDispatchToProps
)(PitchScreenContainer);
