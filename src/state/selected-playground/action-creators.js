import {
  SELECT_PLAYGROUND,
  RESERVE_PLAYGROUND,
  FAILD_LOAD_PLAYGROUND_DETAILS,
  CONFIRM_RESERVATION,
  FAILD_CONFIRM_RESERVATIONS,
  SELECT_RESERVATION_HOUR,
  RATE_PLAYGROUND,
  RATE_PLAYGROUND_FAILED,
  RATE_PLAYGROUND_SUCCESS
} from './actions';
import { PlaygroundDto } from '../../proxy/dtos/classes';

import { HttpClient } from '../../services/http-client/http-client-service';

import { State } from '../state';

export async function selectPlayground(playgroundId: number) {
  var response = await HttpClient.httpFetch(`/playground/${playgroundId}`, {
    method: 'GET'
  });
  if (response.status != 200) {
    console.log('Fail to load Playground Details');
    return dispatch => {
      dispatch({
        type: FAILD_LOAD_PLAYGROUND_DETAILS
      });
    };
  }
  var playground = await response.json();
  return dispatch => {
    dispatch({
      type: SELECT_PLAYGROUND,
      payload: playground
    });
  };
}

export function reservePlayground(date: string) {
  return {
    type: RESERVE_PLAYGROUND,
    payload: date
  };
}

export function selectReservationHour(hour: number) {
  return {
    type: SELECT_RESERVATION_HOUR,
    payload: hour
  };
}

export async function confirmReservation(reservationModel: any) {
  return async (dispatch, getState) => {
    const state: State = getState();
    reservationModel.playgroundId = state.selectedPlayground.current.id;
    reservationModel.date = state.selectedPlayground.reservationDate;
    reservationModel.hour = state.selectedPlayground.selectedHour;
    reservationModel.userId = state.authorization.token.userId;
    var response = await HttpClient.httpFetch(
      `/playground/${state.selectedPlayground.current.id}/reserve`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(reservationModel)
      }
    );
    if (response.status != 200) {
      dispatch({
        type: FAILD_CONFIRM_RESERVATIONS
      });
    }
    let reservationDto = await response.json();
    dispatch({
      type: CONFIRM_RESERVATION,
      payload: reservationDto
    });
  };
}

export async function ratePlayground(rating) {
  return async (dispatch, getState) => {
    const state: State = getState();
    console.log(state.data.myReservations[state.data.currentReservationId]);
    dispatch({
      type: RATE_PLAYGROUND
    });
    debugger;
    var response = await HttpClient.httpFetch(
      `/user/comment/${
        state.data.myReservations[state.data.currentReservationId].playground.id
      }`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(rating)
      }
    );
    if (response.status != 200) {
      dispatch({
        type: RATE_PLAYGROUND_FAILED
      });
    }
    dispatch({
      type: RATE_PLAYGROUND_SUCCESS
    });
  };
}
