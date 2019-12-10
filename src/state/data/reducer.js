import { AnyAction } from 'redux';

import {
  ADD_PLAYGROUNDS,
  LOAD_PLAYGROUNDS,
  FAILD_LOAD_PLAYGROUNDS,
  RESERVE_PLAYGROUND,
  GET_MYRESERVATIONS,
  FAILD_LOAD_MYRESERVATIONS,
  SET_CURRENT_RESERVATIONID
} from './actions';
import { DataState, dataInitialState } from './state';

import * as _ from 'lodash';

export function dataReducer(
  state: DataState = dataInitialState,
  action: AnyAction
): DataState {
  switch (action.type) {
    case ADD_PLAYGROUNDS: {
      var playgroundsById = _.keyBy(action.payload, pg => pg.id);
      return {
        playgrounds: playgroundsById
      };
    }
    case GET_MYRESERVATIONS: {
      var reservationById = _.keyBy(action.payload, res => res.id);
      return {
        ...state,
        myReservations: reservationById
      };
    }
    case SET_CURRENT_RESERVATIONID: {
      return {
        ...state,
        currentReservationId: action.payload
      };
    }
    // case REMOVE_PLAYGROUND: {
    //   delete state.playgrounds[action.payload];
    //   return {
    //     ...state,
    //     playgrounds: state.playgrounds
    //   };
    // }
    default:
      return state;
  }
}
