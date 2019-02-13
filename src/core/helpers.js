/**
 * @param {array<string>} enumValues
 * @returns {object}
 */
let jsEnum = (enumValues) => {
  let counter = 0;
  return enumValues.reduce((enumObject, enumKey) => {
    enumObject[enumKey] = counter++;
  }, {});
};

module.exports = {
  jsEnum
};
