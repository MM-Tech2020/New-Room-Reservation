import { DataState } from './data/state';
import { SelectedPlaygroundState } from './selected-playground/state';
import { AuthorizationState } from './authorization/state';

export type State = {
  data: DataState,
  selectedPlayground: SelectedPlaygroundState,
  authorization: AuthorizationState
};
