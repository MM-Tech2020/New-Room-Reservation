import { PlaygroundDto } from "../../proxy/dtos/classes";
import {
  LOAD_PLAYGROUNDS,
  FAILD_LOAD_PLAYGROUNDS,
  ADD_PLAYGROUNDS,
  RESERVE_PLAYGROUND,
  GET_MYRESERVATIONS,
  FAILD_LOAD_MYRESERVATIONS,
  SET_CURRENT_RESERVATIONID
} from "./actions";

import { HttpClient } from "../../services/http-client/http-client-service";
import { State } from "../state";

export async function loadPlaygrounds() {
  var response = await HttpClient.httpFetch("/playground", { method: "GET" });
  if (response.status != 200) {
    return dispatch => {
      dispatch({
        type: FAILD_LOAD_PLAYGROUNDS
      });
    };
  }
  var playgrounds = await response.json();
  return dispatch => {
    dispatch({
      type: ADD_PLAYGROUNDS,
      payload: playgrounds
    });
  };
}

export function addPlayground(playground: PlaygroundDto) {
  return {
    type: ADD_PLAYGROUND,
    payload: playground
  };
}

export function removePlayground(id: number) {
  return {
    type: REMOVE_PLAYGROUND,
    payload: id
  };
}

export async function getMyReservations() {
  return async (dispatch, getState) => {
    const state: State = getState();
    var response = await HttpClient.httpFetch(
      `/user/reservations/${state.authorization.token.userId}`,
      {
        method: "GET"
      }
    );

    if (response.status != 200) {
      dispatch({
        type: FAILD_LOAD_MYRESERVATIONS
      });
    }

    var playgrounds = await response.json();
    dispatch({
      type: GET_MYRESERVATIONS,
      payload: playgrounds
    });
  };
}

export function setCurrentReservation(id: number) {
  return {
    type: SET_CURRENT_RESERVATIONID,
    payload: id
  };
}

export function ReservationFeedback(feedbackModel) {
  return async (dispatch, getState) => {
    const state: State = getState();
  };
}
