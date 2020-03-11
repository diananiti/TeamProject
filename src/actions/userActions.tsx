export const changeId = (id: number) => ({
  type: 'CHANGE_ID',
  id,
});

export const changeName = (name: string) => ({
  type: 'CHANGE_NAME',
  name,
});

export const changeIsLogged = (isLogged: boolean) => ({
  type: 'CHANGE_IS_LOGGED',
  isLogged,
});
