import { createStackNavigator } from "react-navigation";

import {
  HomeScreen,
  LoginScreen,
  ViewReservationScreen,
  MyReservationsScreen,
  PitchScreen,
  RegisterScreen,
  ReservationsList,
  confirmReservationScreen,
  PayReservationScreen
} from "./screens";

export const Navigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    PitchScreen: PitchScreen,
    ReservationsList: ReservationsList,
    MyReservations: MyReservationsScreen,
    ViewReservation: ViewReservationScreen,
    LoginScreen: LoginScreen,
    RegisterScreen: RegisterScreen,
    ConfirmReservation: confirmReservationScreen,
    PayReservation: PayReservationScreen
  },
  {
    initialRouteName: "LoginScreen"
  }
);
