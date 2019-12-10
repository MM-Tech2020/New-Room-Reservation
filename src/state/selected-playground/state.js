import { PlaygroundDto, ReservationDto } from '../../proxy/dtos/classes';

export interface SelectedPlaygroundState {
  current: PlaygroundDto;
  reservationDate: string;
  selectedReservation: ReservationDto;
  selectedHour: number;
  currentReservation: ReservationDto;
  loading: boolean;
}

export const SelectedPlaygroundInitialState = {
  current: null,
  reservationDate: null,
  selectedReservation: null,
  selectedHour: null,
  currentReservation: null,
  loading: null
};
