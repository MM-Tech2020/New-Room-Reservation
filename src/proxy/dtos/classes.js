export interface EntityDto {
  id: number;
}

export interface ReservationDetailsDto extends EntityDto {
  paid: number;
  totalPrice: number;
  duration: number;
  hour: number;
}

export interface GroundTypeDto extends EntityDto {
  name: string;
}

export interface LocationDto extends EntityDto {
  latitude: string;
  longitude: string;
}

export interface ReservationDto extends EntityDto {
  date: string;
  userId: number;
  PlaygroundId: number;
  reservationDetails: ReservationDetailsDto;
}

export interface PlaygroundDto extends EntityDto {
  number: number;
  name: string;
  imageUrl: string;
  morningPrice: number;
  nightPrice: number;
  switchingHour: number;
  size: string;
  address: string;
  gameType: string;
  groundType: GroundTypeDto;
  location: LocationDto;
  reservations: ReservationDto[];
}
