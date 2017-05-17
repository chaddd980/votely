export default function reducer(state={
  poll: {
    _id: null,
    question: null,
    options: null,
    user: null
  }
}, action) {
  switch (action.type) {
    case "SHOW_POLL":
      return {...state,
        loggedIn: true,
        poll: {
          _id: action.poll.poll._id,
          question: action.poll.poll.question,
          options: action.poll.poll.options,
          user: action.poll.poll.user
        }
      }
    default:
      return state;
  }
}
