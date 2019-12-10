import { AnyAction } from "redux";
import {
  SELECT_PLAYGROUND,
  RESERVE_PLAYGROUND,
  CONFIRM_RESERVATION,
  FAILD_CONFIRM_RESERVATIONS,
  SELECT_RESERVATION_HOUR,
  FAILD_LOAD_PLAYGROUND_DETAILS,
  RATE_PLAYGROUND,
  RATE_PLAYGROUND_FAILED,
  RATE_PLAYGROUND_SUCCESS
} from "./actions";
import {
  SelectedPlaygroundState,
  SelectedPlaygroundInitialState
} from "./state";
import * as _ from "lodash";

export function selectedPlaygroundReducer(
  state: SelectedPlaygroundState = SelectedPlaygroundInitialState,
  action: AnyAction
): SelectedPlaygroundState {
  switch (action.type) {
    case SELECT_PLAYGROUND: {
      return {
        ...state,
        current: action.payload
      };
    }
    case RESERVE_PLAYGROUND: {
      const reservedHours = _.filter(
        state.current.reservations,
        r =>
          parseInt(r.date.split(" ")[0].split("/")[0]) ==
            parseInt(action.payload.split("-")[1]) &&
          parseInt(r.date.split(" ")[0].split("/")[1]) ==
            parseInt(action.payload.split("-")[2])
      );
      return {
        ...state,
        reservationDate: action.payload,
        // selectedReservation: res[action.payload],
        reservedHours: reservedHours
      };
    }
    case SELECT_RESERVATION_HOUR: {
      return {
        ...state,
        selectedHour: action.payload
      };
    }
    case CONFIRM_RESERVATION: {
      return {
        ...state,
        currentReservation: action.payload
      };
    }
    case RATE_PLAYGROUND: {
      return {
        ...state,
        loading: true
      };
    }
    case RATE_PLAYGROUND_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case RATE_PLAYGROUND_FAILED: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}
