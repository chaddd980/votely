export default function reducer(state={
  user: {
    _id: null,
    username: null,
    email: null
  },
  loggedIn: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_USER":
      return {...state,
        loggedIn: true,
        user: {
          _id: action.user.user._id,
          username: action.user.user.username,
          email: action.user.user.email
        }
      }
    case "LOGOUT":
      return {...state,
        loggedIn: false,
        user: {
          _id: null,
          username: null,
          email: null
        }
      }
    default:
      return state;
  }
}
