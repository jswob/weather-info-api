module.exports = function(status, data) {
  const error = new Error({});
  error.status = status;
  error.data = data;
  throw error;
};
