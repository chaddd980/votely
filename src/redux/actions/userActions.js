export const fetchUser = (user) => {
  console.log(user);
  return {
    type: "FETCH_USER",
    user
  }
}

export const logout = () => {
  return {
    type: "LOGOUT",
  }
}
