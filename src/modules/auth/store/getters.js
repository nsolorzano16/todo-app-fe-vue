export const isLoggedIn = (state) => {
  return state.status;
};

export const getEmail = (state) => {
  return state.user.email;
};
