const DAYS = require("../constant/constants");

const getDayOfWeek = (date) => {
  return DAYS[new Date(date).getDay()];
};

module.exports = getDayOfWeek;
