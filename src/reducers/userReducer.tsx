import { initialUser } from '../models/initialState';

const userReducer = (state = initialUser, action: any) => {
  switch (action.type) {
    case 'CHANGE_ID':
      return Object.assign({}, state, { id: action.id });
    case 'CHANGE_NAME':
      return Object.assign({}, state, { name: action.name });
    case 'CHANGE_IS_LOGGED':
      return Object.assign({}, state, { isLogged: action.isLogged });
    default:
      return state;
  }
};

export default userReducer;
