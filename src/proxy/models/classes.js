export interface UserLoginModel {
  username: string;
  password: string;
}

export interface UserRegisterModel {
  fullName: string;
  mobile: string;
  password: string;
  identification: string;
}

export interface UserConfirmModel {
  membershipId: number;
  mobile: string;
  pin: string;
}
