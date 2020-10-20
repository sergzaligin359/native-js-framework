import {TABLE_RESIZE} from './types';

/**
 * Pure function root reducer
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export function rootReducer(state, action) {
  let prevState = null;
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.colState || {};
      prevState[action.payload.id] = action.payload.value;
      return {
        ...state,
        colState: prevState,
      };

    default:
      return state;
  }
}
