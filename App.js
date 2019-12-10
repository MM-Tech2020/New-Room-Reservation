import React from "react";
import { StyleSheet, View } from "react-native";
import { Root, StyleProvider } from "native-base";
import { createAppContainer } from "react-navigation";
import { connect } from "react-redux";
import { Font } from "expo";
import { createStore, Store, applyMiddleware, bindActionCreators } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";

import { State, reducer } from "./src/state";
import getTheme from "./native-base-theme/components";
import commonColor from "./native-base-theme/variables/commonColor";
import { Navigator } from "./src/modules/routing";

const AppContainer = createAppContainer(
  connect(
    state => state,
    dispatch => bindActionCreators({}, dispatch)
  )(Navigator)
);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  store: Store<State> = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware, thunkMiddleware))
  );

  async componentWillMount() {
    // await Font.loadAsync({
    //   Roboto: require("native-base/Fonts/Roboto.ttf"),
    //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    // });
    this.setState({ loading: false });
  }

  render() {
    console.log(this.store);
    console.log(this.store.getState());
    if (this.state.loading) {
      return <Root />;
    }
    return (
      <Provider store={this.store}>
        <Root>
          <StyleProvider style={getTheme(commonColor)}>
            <AppContainer />
          </StyleProvider>
        </Root>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
