module.exports = function(messages) {
  if(messages.constructor !== Array) {
    messages = [messages]
  }
  return {
    errors: messages.map(msg => ({msg}))
  }
};
