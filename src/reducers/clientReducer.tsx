import { initialClient } from '../models/initialState';

const clientReducer = (state = initialClient, action: any) => {
  switch (action.type) {
    case 'SET_CLIENT':
      return Object.assign({}, state, { client: action.client });
    default:
      return state;
  }
};

export default clientReducer;
