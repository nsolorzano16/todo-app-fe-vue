export const loginUser = (state, data) => {
  const { token, id, email } = data;
  if (token) {
    localStorage.setItem('token', token);
  }
  state.user = { id, email };
  state.status = 'AUTHENTICATED';
  state.token = token;
};

export const logoutUser = (state) => {
  state.user = null;
  state.status = 'NOT_AUTHENTICATED';
  state.token = null;
  localStorage.removeItem('token');
};
