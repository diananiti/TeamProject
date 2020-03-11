import { userModel } from '../models/userModel';
import { clientModel } from '../models/clientModel';

export const initialUser: userModel = {
  id: 0,
  name: 'Tom',
  isLogged: false,
};

export const initialClient: clientModel = {
  client: {
    headers: {
      authorization: `Bearer ${''}`,
    },
    uri: 'http://localhost:8080/graphql',
  },
};
