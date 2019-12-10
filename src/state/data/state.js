import { PlaygroundDto, ReservationDto } from '../../proxy/dtos/classes';

export interface DataState {
  playgrounds: PlaygroundDto[] | null;
  myReservations: ReservationDto[] | null;
  currentReservationId: Number;
}

export const dataInitialState = {
  playgrounds: null,
  myReservations: null,
  currentReservationId: null
};
