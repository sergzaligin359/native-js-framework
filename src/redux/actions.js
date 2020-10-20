import {TABLE_RESIZE} from './types';

export const tableReize = (data) => {
  return {
    type: TABLE_RESIZE,
    payload: data,
  };
};
