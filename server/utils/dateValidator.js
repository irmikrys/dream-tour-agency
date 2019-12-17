module.exports = function (dateValue) {
  const date = (Object.prototype.toString.call(input) === '[object Date]')
    ? dateValue
    : new Date(dateValue);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === dateValue;
};
