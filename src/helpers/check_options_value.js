const checkOptionsValue = (options, value) => {
  if (!options) {
    return null;
  }
  if (options.includes(value)) {
    return 'checked';
  } else {
    return null;
  }
};

module.exports = checkOptionsValue;
