module.exports = function (dateValue) {
  const date = new Date(dateValue);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === dateValue;
};
