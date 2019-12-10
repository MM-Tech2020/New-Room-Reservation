import React, { Component } from "react";
import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
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
  Item,
  Input,
  View
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationStackScreenOptions } from "react-navigation";

//----------------------------------------
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import * as _ from "lodash";

import {
  State,
  addPlayground,
  removePlayground,
  selectPlayground,
  loadPlaygrounds
} from "../../state";

import { PlaygroundDto } from "../../proxy/dtos/classes";
import { ScrollView } from "react-native-gesture-handler";
import { FooterComponent } from "../components/footer";

class HomeScreenContainer extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
  }
  static mapStateToProps(state: State) {
    return {
      playgrounds: state.data.playgrounds
    };
  }

  static mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        loadPlaygrounds,
        addPlayground,
        removePlayground,
        selectPlayground
      },
      dispatch
    );
  }
  // -----------------------------------------------------
  props: {
    playgrounds: PlaygroundDto[],
    addPlayground: (playground: Playground) => void,
    removePlayground: (id: number) => void,
    selectPlayground: (playground: Playground) => void,
    loadPlaygrounds: () => void
  };
  static navigationOptions = ({ navigation, state }) => {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );
    return {
      title: "Home",
      tabBarIcon: (
        <Thumbnail
          source={require("../../themes/imgs/login-logo.png")}
          square
          style={{
            alignSelf: "center"
          }}
        />
      ),
      headerLeft: (
        <Button
          onPress={() => {
            console.log("navigate to User Profile");
          }}
          transparent
        >
          <Icon name="list" />
        </Button>
      )
    };
  };
  componentDidMount() {
    this.props.loadPlaygrounds();
  }
  render() {
    const { height: screenHeight, width: screenWidth } = Dimensions.get(
      "window"
    );
    var playgrounds = _.filter(this.props.playgrounds, playground => {
      return playground.name
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    return (
      <Container>
        <ImageBackground
          source={require("../../themes/imgs/playground-background.png")}
          style={{ flex: 1 }}
        >
          <Header searchBar rounded>
            <Item>
              <Icon name="search" />
              <Input
                placeholder="Search"
                onChangeText={txt => {
                  this.setState({
                    search: txt
                  });
                }}
              />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>

          <List style={{ flex: 1 }}>
            <ScrollView>
              {_.map(
                this.state.search == "" ? this.props.playgrounds : playgrounds,
                (playground, id) => {
                  if (
                    playground.gameType == "Business" ||
                    playground.gameType == "Team"
                  ) {
                    return (
                      <ListItem
                        style={{ minHeight: 150 }}
                        key={id}
                        onPress={() => {
                          this.props.selectPlayground(playground.id);
                          this.props.navigation.navigate("PitchScreen", {
                            title: playground.name
                          });
                        }}
                      >
                        <ImageBackground
                          source={require("../../themes/imgs/playground-item-bg-noline.png")}
                          style={{
                            flex: 1,
                            minHeight: 150
                          }}
                        >
                          <Grid
                            style={{
                              flex: 1,
                              paddingTop: 20,
                              paddingRight: 20,
                              paddingLeft: 20
                            }}
                          >
                            <Col size={60}>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  alignSelf: "flex-start"
                                }}
                              >
                                {playground.name}
                              </Text>

                              <Text
                                style={{
                                  marginLeft: 10,
                                  marginTop: 5,
                                  alignSelf: "flex-start"
                                }}
                                note
                              >
                                Sport Type: {playground.gameType}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  alignSelf: "flex-start"
                                }}
                                note
                              >
                                Price/Hour: {playground.morningPrice}
                              </Text>
                            </Col>

                            <Col size={40}>
                              <Thumbnail
                                source={{ uri: `${playground.imageUrl}` }}
                                style={{
                                  flex: 0.5,
                                  width: "100%",
                                  alignSelf: "flex-end"
                                }}
                                square
                              />
                            </Col>
                          </Grid>
                          <Text
                            style={{ marginLeft: 30, alignSelf: "flex-start" }}
                            note
                          >
                            {playground.address}
                          </Text>
                        </ImageBackground>
                      </ListItem>
                    );
                  }
                }
              )}
            </ScrollView>
          </List>

          <FooterComponent
            navigation={this.props.navigation}
            homeActive={true}
            myReservationsActive={false}
          />
        </ImageBackground>
      </Container>
    );
  }
}

export const HomeScreen = connect(
  HomeScreenContainer.mapStateToProps,
  HomeScreenContainer.mapDispatchToProps
)(HomeScreenContainer);
