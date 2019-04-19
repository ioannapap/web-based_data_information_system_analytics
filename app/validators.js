module.exports = {
  isListOfInt: function(val) {
    /* check if a string is comma separated ints */
    const regex = /^[0-9]+(,[0-9]+)*$/;
    return regex.test(val);
  },
};
