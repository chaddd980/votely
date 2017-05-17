export const showPoll = (poll) => {
  console.log(poll);
  return {
    type: "SHOW_POLL",
    poll
  }
}
