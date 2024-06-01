import { ActionReducer } from '@ngrx/store';
import { AppState } from '@app/core/core.state';

export function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const newState = reducer(state, action);
    return newState;
  };
}
